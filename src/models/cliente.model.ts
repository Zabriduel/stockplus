export class Cliente {
    private _id?: number;
    private _cpf: string;
    private _email: string;
    private _idPessoa: number;

    constructor(
        cpf: string,
        email: string,
        idPessoa: number,
        id?: number
    ) {
        this._cpf = cpf;
        this._email = email;
        this._idPessoa = idPessoa;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Cpf(): string {
        return this._cpf;
    }

    public get Email(): string {
        return this._email;
    }

    public get IdPessoa(): number {
        return this._idPessoa;
    }

    public static criar(
        cpf: string,
        email: string,
        idPessoa: number
    ): Cliente {
        return new Cliente(cpf, email, idPessoa);
    }

    public static editar(
        cpf: string,
        email: string,
        idPessoa: number
    ): Cliente {
        return new Cliente(cpf, email, idPessoa);
    }
}