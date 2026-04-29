import { RowDataPacket } from "mysql2";
import { validarCnpj } from "../utils/validar.cnpj";
import { validarNomeFornecedor } from "../utils/validar.nome.fornecedor";

export interface IFornecedor extends RowDataPacket {
    idFornecedor?: number;
    nomeFornecedor?: string;
    cnpj?: string;
}

export class Fornecedor {
    private _idFornecedor?: number;
    private _nomeFornecedor!: string;
    private _cnpj!: string;

    constructor(nomeFornecedor: string, cnpj: string, idFornecedor?: number) {
        this._idFornecedor = idFornecedor;
        this.NomeFornecedor = nomeFornecedor;
        this.Cnpj = cnpj;
    }

    // GETTERS
    public get NomeFornecedor(): string {
        return this._nomeFornecedor;
    }

    public get CNPJ(): string {
        return this._cnpj;
    }

    // SETTERS
    public set NomeFornecedor(value) {
        const nome = validarNomeFornecedor(value);
        this._nomeFornecedor = nome;
    }

    public set Cnpj(value: string) {
        const cnpjValido = validarCnpj(value);
        this._cnpj = cnpjValido;
    }

    public static criar(nomeFornecedor: string, cnpj: string) {
        
        return new Fornecedor(nomeFornecedor, cnpj);
    }

    public static editar(nomeFornecedor: string, cnpj: string, idFornecedor: number) {
        return new Fornecedor(nomeFornecedor, cnpj, idFornecedor)
    }
}

