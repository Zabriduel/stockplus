export class Telefone {
    private _id?: number;
    private _telefone: string;

    constructor(telefone: string, id?: number) {
        this._telefone = telefone;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Telefone(): string {
        return this._telefone;
    }

    public static criar(telefone: string): Telefone {
        return new Telefone(telefone);
    }

    public static editar(telefone: string): Telefone {
        return new Telefone(telefone);
    }
}