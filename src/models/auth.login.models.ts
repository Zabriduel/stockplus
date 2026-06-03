import { validarPerfil } from "../utils/validar.perfil";
import { validarSenha, validarEmail } from "../utils/validators/user.validators";

export interface ILogin {
    id_login?: number;
    email: string;
    senha?: string;
    fk_id_pessoa?: number;
    fk_id_perfil: number;
}

export class Login {

    private _id?: number;
    private _email!: string;
    private _senha!: string;
    private _fkIdPessoa?: number;
    private _fkIdPerfil!: number;

    constructor(
        email: string,
        senha: string,
        fkIdPerfil: number,
        fkIdPessoa?: number,
        id?: number
    ) {
        this._id = id;
        this.Email = email;
        this.Senha = senha;
        this.FkIdPerfil = fkIdPerfil;
        
        if (fkIdPessoa) this.FkIdPessoa = fkIdPessoa;
    }

    // Getters
    public get Id(): number | undefined {
        return this._id;
    }

    public get Email(): string {
        return this._email;
    }

    public get Senha(): string {
        return this._senha;
    }

    public get FkIdPessoa(): number | undefined {
        return this._fkIdPessoa;
    }

    public get FkIdPerfil(): number {
        return this._fkIdPerfil;
    }

    // Setters
    public set Email(value: string) {
        this._email = validarEmail(value);
    }

    public set Senha(value: string) {
        this._senha = validarSenha(value);
    }

    public set FkIdPessoa(value: number | undefined) {
        if (value && value <= 0) throw new Error("Pessoa inválida");
        this._fkIdPessoa = value;
    }

    public set FkIdPerfil(value: number) {
        this._fkIdPerfil = validarPerfil(value);
    }

    // Método de Fábrica (Factory)
    public static criar(
        email: string,
        senha: string,
        fkIdPerfil: number,
        fkIdPessoa?: number
    ): Login {
        return new Login(
            email,
            senha,
            fkIdPerfil,
            fkIdPessoa
        );
    }
}