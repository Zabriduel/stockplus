import { RowDataPacket } from "mysql2";
import { validarId } from "../utils/validar.id";
import { validarNome } from "../utils/validar.nome";

export interface ICategoria extends RowDataPacket {
    id_categoria?: number;
    nome_categoria?: string;
}

export class Categoria {
    private _idCategoria?: number;
    private _nomeCategoria: string = "";

    constructor(nomeCategoria: string, idCategoria?: number) {
          
        this._nomeCategoria = validarNome(nomeCategoria);
        this._idCategoria = idCategoria;
    }

    // GETTERS

    public get IdCategoria(): number | undefined {
        return this._idCategoria;
    }

    public get NomeCategoria(): string {
        return this._nomeCategoria;
    }

    // SETTERS

    public set IdCategoria(value: number) {
        this._idCategoria = value;
    }

    public get nomeCategoria(): string {
        return this._nomeCategoria;
    }

    // FACTORY

    public static criar(nomeCategoria: string): Categoria {
        return new Categoria(nomeCategoria);
    }

    public static editar(idCategoria: number, nomeCategoria: string): Categoria {
        return new Categoria(nomeCategoria, idCategoria);
    }
}