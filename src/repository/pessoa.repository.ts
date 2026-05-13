import { db } from "../database/connetion.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Pessoa } from "../models/pessoa.model";

export class PessoaRepository {
    async findAll(): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM pessoa;";
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM pessoa WHERE idPessoa = ?;";
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByNome(nome: string): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM pessoa WHERE nome = ?;";
        const values = [nome];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async create(dados: Pessoa): Promise<ResultSetHeader> {
        const sql = `
            INSERT INTO pessoa (nome)
            VALUES (?);
        `;
        const values = [dados.Nome];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Pessoa): Promise<ResultSetHeader> {
        const sql = `
            UPDATE pessoa
            SET nome = ?
            WHERE idPessoa = ?;
        `;
        const values = [dados.Nome, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM pessoa WHERE idPessoa = ?;";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}