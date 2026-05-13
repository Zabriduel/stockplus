import { RowDataPacket } from "mysql2";
import { validarId } from "../../../../PSOF/PAGE PLATAFORMA DE AVALIACAO E GESTAO ESCOLAR/src/utils/validar.id";

export interface ILote extends RowDataPacket {
    idLote?: number;
    fkIdProduto?: number;
    fkIdFornecedor?: number;
    qtdLote?: number;
    dataVencimento?: Date;
}

export class Lote {
    private _idLote?: number;
    private _fkIdProduto!: number
    private _fkIdFornecedor!: number;
    private _lote!: string;
    private _qtdLote!: number;
    private _dataVencimento!: Date;

    constructor(fkIdProduto: number, fkIdFornecedor: number, lote: string, qtdLote: number, dataVencimento: Date, idLote?: number) {
        this._idLote = idLote;
        this.FkIdProduto = fkIdProduto;
        this.FkIdFornecedor = fkIdFornecedor;
        this._lote = lote;
        this._qtdLote = qtdLote;
        this._dataVencimento = dataVencimento;

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
    public get Lote(): string {
        return this._lote
    }
    public get QtdLote(): number {
        return this._qtdLote;
    }

    public set FkIdProduto(id: number) {
        const IdProduto = validarId(id);
        this._fkIdProduto = IdProduto

    }
    public set FkIdFornecedor(id: number) {
        const idFornecedor = validarId(id);
        this._fkIdFornecedor = idFornecedor

    }

    public static criar(fkIdProduto: number, fkIdFornecedor: number, lote: string, qtdLote: number, dataVencimento: Date) {
        return new Lote(fkIdProduto, fkIdFornecedor, lote, qtdLote, dataVencimento);
    }
    public static editar(fkIdProduto: number, fkIdFornecedor: number, lote: string, qtdLote: number, dataVencimento: Date, idLote: number) {
        return new Lote(fkIdProduto, fkIdFornecedor, lote, qtdLote, dataVencimento, idLote);
    }

}