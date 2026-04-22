import { db } from "../database/connetion.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Cliente } from "../models/cliente.model";

export class ClienteRepository {
    async findAll(): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM clientes;";
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM clientes WHERE id_cliente = ?;";
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByIdDefault(id: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM clientes WHERE id_cliente = ?;";
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByName(nome: string): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM clientes WHERE nome_cliente = ?;";
        const values = [nome];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async create(dados: Cliente): Promise<ResultSetHeader> {
        const sql = `
            INSERT INTO clientes (cpf, nome_cliente, email)
            VALUES (?, ?, ?);
        `;
        const values = [dados.Cpf, dados.Nome, dados.Email];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Cliente): Promise<ResultSetHeader> {
        const sql = `
            UPDATE clientes
            SET cpf = ?, nome_cliente = ?, email = ?
            WHERE id_cliente = ?;
        `;
        const values = [dados.Cpf, dados.Nome, dados.Email, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM clientes WHERE id_cliente = ?;";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async findByCpf(cpf: string): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM clientes WHERE cpf = ?;";
        const values = [cpf];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByEmail(email: string): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM clientes WHERE email = ?;";
        const values = [email];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }
}