import { UserModel } from '../models/userModel';

export const getAllUsers = async () => {
    return await UserModel.findAll();
};

export const findOne = async (username: string) => {
    return await UserModel.findOne(username);
}

export const findById = async (id: string) => {
    return await UserModel.findById(id)
}

export const findByEmail = async (email: string) => {
    return await UserModel.findByEmail(email);
}

export const createUser  = async (data: any) => {
    return await UserModel.createUser(data);
};

export const update = async (id: string, data: any) => {
    return await UserModel.update(id, data);
}

export const showProfile = async (id: string) => {
    return await UserModel.showProfile(id);
}

export const deleteUser = async (id: string) => {
    return await UserModel.delete(id);
}

export const authentication = async (username: string, password: string) => {
    return await UserModel.authentication(username, password)
}