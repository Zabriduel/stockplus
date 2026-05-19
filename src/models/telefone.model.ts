export class Telefone {

    private _id?: number;
    private _telefone: string;
    private _fk_id_pessoa: number;

    constructor(
        telefone: string,
        fk_id_pessoa: number,
        id?: number
    ) {
        this._telefone = telefone;
        this._fk_id_pessoa = fk_id_pessoa;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get Telefone(): string {
        return this._telefone;
    }

    public get FkIdPessoa(): number {
        return this._fk_id_pessoa;
    }

    public static criar(telefone: string,fk_id_pessoa: number): Telefone {
        return new Telefone(telefone,fk_id_pessoa );
    }

    public static editar(telefone: string,fk_id_pessoa: number): Telefone {
        return new Telefone(telefone,fk_id_pessoa);
    }
}