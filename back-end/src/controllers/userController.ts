import { Request, Response } from 'express';
import * as UserService from '../services/userService';
import { sendResponse } from '../utils/responseHandler';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { CartService } from '../services/cartService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        sendResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const createAdmin  = async (req: Request, res: Response) => {
    try {
        const { name, username,email, password } = req.body;
        const findUsername = await UserService.findOne(username)
        const findEmail = await UserService.findByEmail(email)

        if(findUsername){
            sendResponse(res, 400, 'Username already exist', "")
            return
        }

        if(findEmail){
            sendResponse(res, 400, 'Email already exist', "")
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser  = await UserService.createUser({ name, email,username, password: hashedPassword, role: 'ADMIN' });
        try {
            await CartService.createCart(newUser.id);
        } catch (cartError) {
            console.error("Cart creation failed:", cartError);
        }
        sendResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password } = req.body;

        // Cek apakah username atau email sudah ada
        const findUsername = await UserService.findOne(username);
        if (findUsername) {
            sendResponse(res, 400, 'Username already exists', "");
            return;
        }

        const findEmail = await UserService.findByEmail(email);
        if (findEmail) {
            sendResponse(res, 400, 'Email already exists', "");
            return;
        }

        // Hash password dan buat user baru
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserService.createUser({
            name,
            email,
            username,
            password: hashedPassword,
            role: 'USER'
        });

        try {
            await CartService.createCart(newUser.id);
        } catch (cartError) {
            console.error("Cart creation failed:", cartError);
        }

        sendResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, 'Internal server error', "");
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name, username, email, password, phone, profile } = req.body;

        const findUser = await UserService.findById(id)
        if(!findUser){
            sendResponse(res, 404, 'User not found', "")
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUser = await UserService.update(id, { name, username, email, password: hashedPassword, phone, profile });
        sendResponse(res, 200, 'User updated successfully', updatedUser);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const showProfile = async (req: Request, res: Response) => {
    try {
        const id = (req as any).userId
        const user = await UserService.showProfile(id);

        sendResponse(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const password = req.body.password
        const findUser = await UserService.findById(id)
        if(!findUser){
            sendResponse(res, 404, 'User not found', "")
            return
        }

        const isMatchPassword = await bcrypt.compare(password, findUser?.password)
        if(!isMatchPassword){
            sendResponse(res, 400, "Password Invalid", "")            
            return
        }

        const deletedUser = await UserService.deleteUser(id);
        sendResponse(res, 200, 'User deleted successfully', deletedUser);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, 'Internal server error', "");
    }
}

export const authentication = async(req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body
        
        /**check existing username*/
        const findUser = await UserService.authentication(username, password)
        if(!findUser){
            sendResponse(res, 404, 'User not register', "")
            return
        }

        const isMatchPassword = await bcrypt.compare(password, findUser?.password)
        if(!isMatchPassword){
            sendResponse(res, 400, "Username or Password Invalid", "")
            return
        }

        /** prepare to generate token using JWT */
        const payload = {
            sub: String(findUser?.id ?? ""), 
            name: findUser?.name ?? "Anonymous",
            userRole: findUser?.role ?? "user",
            iat: Math.floor(Date.now() / 1000),               
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24  
        };

        const signature = process.env.SECRET || ``

        const token = jwt.sign(payload, signature)
        
        sendResponse(res, 200, 'Login success', token)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}