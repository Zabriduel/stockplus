import { RowDataPacket } from "mysql2";
import { validarCnpj } from "../utils/validar.cnpj";
import { Pessoa } from "./pessoa.model";

export interface IFornecedor extends RowDataPacket {
    idFornecedor?: number;
    cnpj?: string;
    fkIdPessoa?: number;
}

export class Fornecedor {
    private _idFornecedor?: number;
    private _cnpj!: string;
    private _pessoa: Pessoa;

    constructor(pessoa: Pessoa, cnpj: string, idFornecedor?: number) {
        this._idFornecedor = idFornecedor;
        this._pessoa = pessoa;
        this.Cnpj = cnpj;
    }

    // GETTERS
    public get IdFornecedor(): number | undefined {
        return this._idFornecedor;
    }

    public get Cnpj(): string {
        return this._cnpj;
    }

    public get Pessoa(): Pessoa {
        return this._pessoa;
    }

    // SETTER
    public set Cnpj(value: string) {        
        const cnpjValido = validarCnpj(value);
        this._cnpj = cnpjValido;
    }

    public static criar(nomeFornecedor: string, cnpj: string): Fornecedor {
        const pessoa = Pessoa.criar(nomeFornecedor);
        return new Fornecedor(pessoa, cnpj);
    }

    public static editar(nomeFornecedor: string, cnpj: string, idFornecedor: number, idPessoa: number): Fornecedor {
        const pessoa = new Pessoa(nomeFornecedor, idPessoa);
        return new Fornecedor(pessoa, cnpj, idFornecedor);
    }
}