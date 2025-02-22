import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    sub: string;
    name: string;
    userRole: string;
    iat: number;
    exp: number;
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void  => {
    try {
        // Ambil token dari header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Access Denied: No token provided" });
            return
        }

        const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"
        if (!token) {
            res.status(401).json({ message: "Access Denied: Invalid token format" });
            return
        }

        // Verifikasi token
        const signature = process.env.SECRET || "defaultSecret";
        const decoded = jwt.verify(token, signature) as DecodedToken;

        // Cek apakah user memiliki role "admin"
        if (decoded.userRole !== "ADMIN") {
            res.status(403).json({ message: "Forbidden: You do not have admin privileges" });
            return 
        }

        // Lanjut ke handler berikutnya
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
        return 
    }
};
