// backend/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { JwtService } from "../utils/JwtService";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id_login: number;
                email: string;
                fk_id_perfil: number;
                fk_id_pessoa: number;
            };
        }
    }
}

export class AuthMiddleware {

    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService();
    }

    authenticate = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Token não fornecido" });
            return;
        }
        
        const token = authHeader.split(" ")[1];
        
        try {
            const decoded = this.jwtService.verificarTokenAcesso(token);
            req.user = {
                id_login: decoded.id_login,
                email: decoded.email,
                fk_id_pessoa: decoded.fk_id_pessoa,
                fk_id_perfil: decoded.fk_id_perfil
            };
            next();

        } catch (error) {
            res.status(401).json({ message: "Token inválido ou expirado"});
        }
    };
}

