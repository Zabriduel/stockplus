import { db } from "../database/connetion.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Cliente } from "../models/cliente.model";

export class ClienteRepository {

    async findAll(): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                c.id_cliente,
                c.cpf,
                c.email,
                p.id_pessoa,
                p.nome
            FROM clientes c
            INNER JOIN pessoa p
                ON c.fk_id_pessoa = p.id_pessoa;
        `;
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                c.id_cliente,
                c.cpf,
                c.email,
                p.id_pessoa,
                p.nome
            FROM clientes c
            INNER JOIN pessoa p
                ON c.fk_id_pessoa = p.id_pessoa
            WHERE c.id_cliente = ?;
        `;
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
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

    async create(dados: Cliente): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO clientes (cpf, email, fk_id_pessoa) VALUES (?, ?, ?);';
        const values = [dados.Cpf,dados.Email, dados.IdPessoa ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Cliente): Promise<ResultSetHeader> {
        const sql = 'UPDATE clientes SET cpf = ?, email = ?, fk_id_pessoa = ? WHERE id_cliente = ?;';
        const values = [dados.Cpf,dados.Email,dados.IdPessoa,id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM clientes WHERE id_cliente = ?;";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}