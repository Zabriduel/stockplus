
export class Pessoa {
    private _id?: number;
    private _nome: string;

    constructor(nome: string, id?: number) {
        this._nome = nome;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    public static criar(nome: string): Pessoa {
        return new Pessoa(nome);
    }

    public static editar(nome: string): Pessoa {
        return new Pessoa(nome);
    }
}