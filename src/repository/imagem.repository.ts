import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { IImagem, Imagem } from "../models/imagem.model";

export class ImagemRepository {

    async findAll(): Promise<IImagem[]> {

        const sql = `
            SELECT *
            FROM imagens
            ORDER BY id_imagem;
        `;

        const [rows] = await db.execute<IImagem[]>(sql);

        return rows;
    }

    async findById(id: number): Promise<IImagem[]> {

        const sql = `
            SELECT *
            FROM imagens
            WHERE id_imagem = ?;
        `;

        const [rows] = await db.execute<IImagem[]>(
            sql,
            [id]
        );

        return rows;
    }

    async create(imagem: Imagem): Promise<ResultSetHeader> {

        const sql = `
            INSERT INTO imagens (
                vinculo_imagem
            )
            VALUES (?);
        `;

        const values = [
            imagem.vinculoImagem
        ];

        const [result] = await db.execute<ResultSetHeader>(
            sql,
            values
        );

        return result;
    }

    async update(
        id: number,
        imagem: Imagem
    ): Promise<ResultSetHeader> {

        const sql = `
            UPDATE imagens
            SET vinculo_imagem = ?
            WHERE id_imagem = ?;
        `;

        const values = [
            imagem.vinculoImagem,
            id
        ];

        const [result] = await db.execute<ResultSetHeader>(
            sql,
            values
        );

        return result;
    }

    async delete(id: number): Promise<ResultSetHeader> {

        const sql = `
            DELETE FROM imagens
            WHERE id_imagem = ?;
        `;

        const [result] = await db.execute<ResultSetHeader>(
            sql,
            [id]
        );

        return result;
    }
}