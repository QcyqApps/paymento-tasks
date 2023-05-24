import { Request, Response, NextFunction } from "express";
import JwtService from "../services/JwtService";

const jwtService = new JwtService("super-secret-key");

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No authorization token"});
    }

    try {
        const decodedPayload = jwtService.verifyToken(token);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Wrong authorization token"});
    }
};

export default authMiddleware;
