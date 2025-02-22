import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../utils/responseHandler"

interface DecodedToken {
    sub: string;
    name: string;
    userRole: string;
    iat: number;
    exp: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        /** read token from header */ 
        const header = req.headers.authorization
        const [bearer, token] = header ? header.split(" "): []

        // verify token
        const signature = process.env.SECRET || ""
        const decoded = jwt.verify(token, signature) as DecodedToken

        (req as any).userId = decoded.sub;

        if (!decoded) {
            sendResponse(res, 401, 'Unauthorized', "")
            return
        }

        next()
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export { verifyToken }