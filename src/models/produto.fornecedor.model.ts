import { RowDataPacket } from "mysql2";
export interface ProdutoFornecedor extends RowDataPacket {
    id?: number;
    idProduto?: number;
    idFornecedor?: number;
    quantidade?: number;
}

export class ProdutoFornecedor {
    private _id?: number;
    private _idProduto!: number;
    private _idFornecedor!: number;
    private _quantidade!: number;

    constructor(idProduto: number, idFornecedor: number, quantidade: number, id?: number) {
        this._id = id;
        this.IdProduto = idProduto;
        this.IdFornecedor = idFornecedor;
        this.Quantidade = quantidade;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get IdProduto(): number | undefined {
        return this._idProduto;
    }

    public get IdFornecedor(): number | undefined {
        return this._idFornecedor;
    }

    public get Quantidade(): number | undefined {
        return this._quantidade;
    }

    public set Id(value: number) {
        this._id = value;
    }

    public set IdProduto(value: number) {
        this._validarId(value);
        this._idProduto = value;
    }

    public set IdFornecedor(value: number) {
        this._validarId(value);
        this._idFornecedor = value;
    }

    public set Quantidade(value: number) {
        this._validarQuantidade(value);
        this._quantidade = value;
    }

    public static inserir(idProduto: number, idFornecedor: number, quantidade: number): ProdutoFornecedor {
        return new ProdutoFornecedor(idProduto, idFornecedor, quantidade);
    }

    public static alterar(idProduto: number, idFornecedor: number, quantidade: number, id: number) {
        return new ProdutoFornecedor(idProduto, idFornecedor, quantidade, id);
    }

    private _validarId(value: number): void {
        if (!value || isNaN(value)) {
            throw new Error("ID deve ser um valor numérico!");
        }
    }

    private _validarQuantidade(value: number): void {
        if (!value || isNaN(value)) {
            throw new Error("ID deve ser um valor numérico!");
        }

        if (value < 1) {
            throw new Error("Quantidade deve ser igual ou superior à um!");
        }
    }
}
