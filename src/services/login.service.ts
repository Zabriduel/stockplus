import bcrypt from "bcryptjs";
import { Login } from "../models/auth.login.models";
import { LoginRepository } from "../repository/auth.repository";
import { validarEmail, validarPessoa, validarSenha } from "../utils/validators/user.validators";
import { validarPerfil } from "../utils/validar.perfil";

export class LoginService {

    constructor(
        private _repository = new LoginRepository()
    ) { }

    async autenticar(
        email: string,
        senha: string
    ) {
        const emailValido = validarEmail(email);
        validarSenha(senha);

        const usuario = await this._repository.findByEmail(emailValido);

        if (!usuario) {
            throw new Error("Usuário não encontrado ou e-mail incorreto.");
        }

        if (!usuario.senha) {
            throw new Error("Erro de autenticação: credenciais inválidas.");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Senha inválida.");
        }

        delete usuario.senha;

        return usuario;
    }

    async criar(
        email: string,
        senha: string,
        fk_id_perfil: number,
        fk_id_pessoa: number
    ) {
        const emailValido = validarEmail(email);
        const senhaValida = validarSenha(senha);
        const perfilValido = validarPerfil(fk_id_perfil);
        const pessoaValida = validarPessoa(fk_id_pessoa);
        
        const senhaHash = await bcrypt.hash(senhaValida, 10);
        
        const login = Login.criar(
            emailValido,
            senhaHash,
            perfilValido,
            pessoaValida
        );

        return await this._repository.create(
            login.Email,
            login.Senha,
            pessoaValida,
            login.FkIdPerfil
        );
    }
}