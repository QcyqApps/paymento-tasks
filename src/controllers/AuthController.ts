import { Request, Response } from "express";
import JwtService from "../services/JwtService";

class AuthController {
    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    login(req: Request, res: Response): void {
        const { login, password } = req.body;

        if (login === "root" && password === "pass") {
            const user = {
                id: 1,
                username: "root",
            };

            const token = this.jwtService.generateToken(user);

            res.json({ token });
        } else {
            res.status(401).json({ message: "Wrong login or password" });
        }
    }
}

export default AuthController;
