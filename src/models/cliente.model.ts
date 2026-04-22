export class Cliente {
    private _id?: number;
    private _nome: string;
    private _email: string;
    private _cpf: string;

    constructor(nome: string, email: string, cpf: string, id?: number) {
        this._nome = nome;
        this._email = email;
        this._cpf = cpf;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Email(): string {
        return this._email;
    }

    public get Cpf(): string {
        return this._cpf;
    }

    public static criar(nome: string, email: string, cpf: string): Cliente {
        return new Cliente(nome, email, cpf);
    }

    public static editar(nome: string, email: string, cpf: string): Cliente {
        return new Cliente(nome, email, cpf);
    }
}