import { RowDataPacket } from "mysql2";
import { validarId } from "../utils/validar.id";

export interface IImagemProduto extends RowDataPacket {
    id_imagem_prod?: number;
    fk_id_imagem: number;
    fk_id_produto: number;
}

export class ImagemProduto {

    private _idImagemProduto?: number;
    private _idImagem: number;
    private _idProduto: number;

    constructor(
        idImagem: number,
        idProduto: number,
        idImagemProduto?: number
    ) {

        this._idImagem = validarId(idImagem);
        this._idProduto = validarId(idProduto);

        if (idImagemProduto) {
            this._idImagemProduto = idImagemProduto;
        }
    }

    public get idImagemProduto(): number | undefined {
        return this._idImagemProduto;
    }

    public get idImagem(): number {
        return this._idImagem;
    }

    public get idProduto(): number {
        return this._idProduto;
    }

    public static criar(
        idImagem: number,
        idProduto: number
    ): ImagemProduto {

        return new ImagemProduto(
            idImagem,
            idProduto
        );
    }
}