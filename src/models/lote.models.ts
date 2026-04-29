import { RowDataPacket } from "mysql2";

export interface ILote extends RowDataPacket{
    idLote?: number;
    fkIdProduto?: number;
    fkIdFornecedor?: number;
    qtnLote?: number;    
}

export class Lote {
    private _idLote?: number;
    private _fkIdProduto!: number
    private _fkIdFornecedor!: number;
    private _qtnLote!: number;
    
    constructor(fkIdProduto: number, fkIdFornecedor: number, qtnLote: number, idLote?: number) {
        this._idLote = idLote;
        this._fkIdProduto = fkIdProduto;
        this._fkIdFornecedor = fkIdFornecedor;
        this._qtnLote = qtnLote;
    }

    public get IdLote(): number | undefined {
        return this._idLote;
    }
    
    public get FkIdProduto(): number {
        return this._fkIdProduto;
    }
    public get FkIdFornecedor(): number {
        return this._fkIdFornecedor;
    }
    public get QtnLote(): number {
        return this._qtnLote;
    }

    public static criar(fkIdProduto: number, fkIdFornecedor: number, qtnLote: number) {
        return new Lote(fkIdProduto, fkIdFornecedor, qtnLote);
    }
    public static editar(fkIdProduto: number, fkIdFornecedor: number, qtnLote: number, idLote: number) {
        return new Lote(fkIdProduto, fkIdFornecedor, qtnLote, idLote);
    }

}