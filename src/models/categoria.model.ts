import { RowDataPacket } from "mysql2";
export interface ICategoria extends RowDataPacket {
    id?: number;
    nome?: string;
}

export class Categoria {
    private _id?: number;
    private _nome: string = "";

    constructor(nome: string, id?: number) {
        this.Nome = nome;
        this._id = id;
    }

    //GETTERS

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    //SETTERS

    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Id(value: number) {
        this._id = value;
    }

    //DP => Factory
    public static criar(nome: string): Categoria {
        return new Categoria(nome);
    }

    public static editar(nome: string, id: number) {
        return new Categoria(nome, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome da categoria deve ter ao menos 3 caracteres');
        }

        if (value.trim().length > 100) {
            throw new Error('Nome da categoria deve ter no máximo 100 caracteres.')
        }
    }
}
