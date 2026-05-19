import { db } from "../database/connection.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Telefone } from "../models/telefone.model";

export class TelefoneRepository {

    async findAll(): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                t.id_telefone,
                t.telefone,
                p.id_pessoa,
                p.nome
            FROM telefone t
            INNER JOIN pessoa p
                ON t.fk_id_pessoa = p.id_pessoa;
        `;
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                t.id_telefone,
                t.telefone,
                p.id_pessoa,
                p.nome
            FROM telefone t
            INNER JOIN pessoa p
                ON t.fk_id_pessoa = p.id_pessoa
            WHERE t.id_telefone = ?;
        `;

        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByTelefone(
        telefone: string
    ): Promise<RowDataPacket[]> {
        const sql = 'SELECT * FROM telefone WHERE telefone = ?;';
        const values = [telefone];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async create(
        dados: Telefone
    ): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO telefone ( telefone,fk_id_pessoa)VALUES (?, ?);';
        const values = [dados.Telefone, dados.FkIdPessoa];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Telefone): Promise<ResultSetHeader> {
        const sql = ' UPDATE telefone SET telefone = ?, fk_id_pessoa = ? WHERE id_telefone = ?;';
        const values = [dados.Telefone,dados.FkIdPessoa,id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(
        id: number
    ): Promise<ResultSetHeader> {

        const sql = 'DELETE FROM telefone WHERE id_telefone = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}