import jwt from 'jsonwebtoken';
import 'dotenv/config';


export interface JwtDados {
    id_login: number;
    email: string;
    cpf: string;
    is_active: number;
    fk_id_pessoa: number;
    fk_id_perfil: number;
}

export class JwtService {

    private readonly secret: string;
    private readonly expireIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'default_secret';
        this.expireIn = process.env.JWT_EXPIRES_IN || '1h';
    }

    gerarTokenAcesso(dados: JwtDados): string {
        return jwt.sign(dados, this.secret, {
            expiresIn: this.expireIn as jwt.SignOptions['expiresIn']
        })
    }

    verificarTokenAcesso(token: string): JwtDados {
        return jwt.verify(token, this.secret) as JwtDados;
    }

    decodificarTokenAcesso(token: string): JwtDados | null {
        return jwt.decode(token) as JwtDados | null;
    }
}

