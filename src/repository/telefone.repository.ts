import { db } from "../database/connetion.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Telefone } from "../models/telefone.model";

export class TelefoneRepository {

    async findAll(): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM telefones;";
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM telefones WHERE id_telefone = ?;";
        const [rows] = await db.execute<RowDataPacket[]>(sql, [id]);
        return rows;
    }

    async findByTelefone(telefone: string): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM telefones WHERE telefone = ?;";
        const [rows] = await db.execute<RowDataPacket[]>(sql, [telefone]);
        return rows;
    }

    async create(dados: Telefone): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO telefones (telefone) VALUES (?);';
        const values = [dados.Telefone];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Telefone): Promise<ResultSetHeader> {
        const sql = 'UPDATE telefones SET telefone = ? WHERE id_telefone = ?;';
        const values = [dados.Telefone, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM telefones WHERE id_telefone = ?;';
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }
}