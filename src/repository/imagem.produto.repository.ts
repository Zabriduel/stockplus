import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import {
    IImagemProduto,
    ImagemProduto
} from "../models/imagem.produto.model";

export class ImagemProdutoRepository {

    async create(
        imagemProduto: ImagemProduto
    ): Promise<ResultSetHeader> {

        const sql = `
            INSERT INTO imagens_produtos (
                fk_id_imagem,
                fk_id_produto
            )
            VALUES (?, ?);
        `;

        const values = [
            imagemProduto.idImagem,
            imagemProduto.idProduto
        ];

        const [result] = await db.execute<ResultSetHeader>(
            sql,
            values
        );

        return result;
    }

    async findByProduto(
        idProduto: number
    ): Promise<IImagemProduto[]> {

        const sql = `
            SELECT *
            FROM imagens_produtos
            WHERE fk_id_produto = ?;
        `;

        const [rows] = await db.execute<IImagemProduto[]>(
            sql,
            [idProduto]
        );

        return rows;
    }

    async delete(idImagem: number): Promise<ResultSetHeader> {

        const sql = `
            DELETE FROM imagens_produtos
            WHERE fk_id_imagem = ?;
        `;

        const [result] = await db.execute<ResultSetHeader>(
            sql,
            [idImagem]
        );

        return result;
    }
}