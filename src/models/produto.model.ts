import { RowDataPacket } from "mysql2";
import { validarId } from "../utils/validar.id";
import { validarNome } from "../utils/validar.nome";
import { validarValor } from "../utils/validar.valor";

export interface IProduto extends RowDataPacket {
    id_produto?: number;
    fk_id_categoria: number;
    nome_produto: string;
    valor_produto: number;
    data_cadastro?: Date;
}

export class Produto {
    private _id?: number;
    private _idCategoria: number;
    private _nome: string;
    private _valor: number;

    constructor(nome: string, valor: number, idCategoria: number, id?: number) {
        this._nome = validarNome(nome);
        this._valor = validarValor(valor);
        this._idCategoria = validarId(idCategoria);
        this._id = id;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get valor(): number {
        return this._valor;
    }

    public get idCategoria(): number {
        return this._idCategoria;
    }

    public static criar(nome: string, valor: number, idCategoria: number): Produto {
        return new Produto(nome, valor, idCategoria);
    }

    public static editar(id: number, nome: string, valor: number, idCategoria: number): Produto {
        return new Produto(nome, valor, idCategoria, id);
    }
}