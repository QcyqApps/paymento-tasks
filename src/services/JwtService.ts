import { verify, sign } from "jsonwebtoken";

class JwtService {
    private readonly secretKey: string;
    private readonly expiresIn: string;

    constructor(secretKey: string, expiresIn: string = "1h") {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    generateToken(payload: any): string {
        return sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    verifyToken(token: string): any {
        try {
            return verify(token, this.secretKey);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}

export default JwtService;
