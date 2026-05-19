export class EnderecoCliente {

    private _id?: number;
    private _fk_id_cliente: number;
    private _logradouro: string;
    private _numero: string;
    private _bairro: string;
    private _cidade: string;
    private _cep: string;
    private _uf: string;
    private _complemento?: string;

    constructor(
        fk_id_cliente: number,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        cep: string,
        uf: string,
        complemento?: string,
        id?: number
    ) {
        this._fk_id_cliente = fk_id_cliente;
        this._logradouro = logradouro;
        this._numero = numero;
        this._bairro = bairro;
        this._cidade = cidade;
        this._cep = cep;
        this._uf = uf;
        this._complemento = complemento;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get FkIdCliente(): number {
        return this._fk_id_cliente;
    }

    public get Logradouro(): string {
        return this._logradouro;
    }

    public get Numero(): string {
        return this._numero;
    }

    public get Bairro(): string {
        return this._bairro;
    }

    public get Cidade(): string {
        return this._cidade;
    }

    public get Cep(): string {
        return this._cep;
    }

    public get Uf(): string {
        return this._uf;
    }

    public get Complemento(): string | undefined {
        return this._complemento;
    }

    public static criar(
        fk_id_cliente: number,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        cep: string,
        uf: string,
        complemento?: string
    ): EnderecoCliente {
        return new EnderecoCliente(
            fk_id_cliente,
            logradouro,
            numero,
            bairro,
            cidade,
            cep,
            uf,
            complemento
        );
    }

    public static editar(
        fk_id_cliente: number,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        cep: string,
        uf: string,
        complemento?: string
    ): EnderecoCliente {
        return new EnderecoCliente(
            fk_id_cliente,
            logradouro,
            numero,
            bairro,
            cidade,
            cep,
            uf,
            complemento
        );
    }
}