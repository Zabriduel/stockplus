export class EnderecoCliente {
    private _id?: number;

    constructor(
        private _fk_id_cliente: number,
        private _logradouro: string,
        private _numero: string,
        private _bairro: string,
        private _cidade: string,
        private _cep: string,
        private _uf: string,
        private _complemento?: string,
        id?: number
    ) {
        this._id = id;
    }

    public get Id() { return this._id; }
    public get FkIdCliente() { return this._fk_id_cliente; }
    public get Logradouro() { return this._logradouro; }
    public get Numero() { return this._numero; }
    public get Bairro() { return this._bairro; }
    public get Cidade() { return this._cidade; }
    public get Cep() { return this._cep; }
    public get Uf() { return this._uf; }
    public get Complemento() { return this._complemento; }

    public static criar(
        fk_id_cliente: number,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        cep: string,
        uf: string,
        complemento?: string
    ) {
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
    ) {
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