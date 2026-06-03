import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import jwt from "jsonwebtoken";

export class AuthController {
    
    private _service = new LoginService();

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
            }
            const usuario = await this._service.autenticar(email, senha);

            const secret = process.env.JWT_SECRET || "chave_secreta_padrao_mude_isso"; 
            
            const token = jwt.sign(
                { 
                    id_login: usuario.id_login, 
                    fk_id_perfil: usuario.fk_id_perfil,
                    fk_id_pessoa: usuario.fk_id_pessoa 
                },
                secret,
                { expiresIn: "8h" } 
            );

            return res.status(200).json({
                message: "Autenticado com sucesso",
                token,
                usuario
            });

        } catch (error: any) {
            
            return res.status(401).json({ error: error.message });
        }
    }

    async registrar(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha, fk_id_perfil, fk_id_pessoa } = req.body;

            if (!email || !senha || !fk_id_perfil || !fk_id_pessoa) {
                return res.status(400).json({ error: "Todos os campos (email, senha, fk_id_perfil, fk_id_pessoa) são obrigatórios." });
            }

            const idNovoLogin = await this._service.criar(email, senha, fk_id_perfil, fk_id_pessoa);

            return res.status(201).json({
                message: "Login criado com sucesso",
                id_login: idNovoLogin
            });

        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}