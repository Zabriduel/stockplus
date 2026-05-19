import { db } from "../database/connection.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { EnderecoCliente } from "../models/endereco.cliente.model";

export class EnderecoClienteRepository {
    async findAll(): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM enderecos_clientes;";
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM enderecos_clientes WHERE id_endereco = ?;";
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByIdDefault(id: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM enderecos_clientes WHERE id_endereco = ?;";
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async findByCliente(id_cliente: number): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM enderecos_clientes WHERE fk_id_cliente = ?;";
        const values = [id_cliente];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async create(dados: EnderecoCliente): Promise<ResultSetHeader> {
        const sql = `
            INSERT INTO enderecos_clientes
            (fk_id_cliente, logradouro, numero, bairro, cidade, cep, uf, complemento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const values = [
            dados.FkIdCliente,
            dados.Logradouro,
            dados.Numero,
            dados.Bairro,
            dados.Cidade,
            dados.Cep,
            dados.Uf,
            dados.Complemento || null
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: EnderecoCliente): Promise<ResultSetHeader> {
        const sql = `
            UPDATE enderecos_clientes
            SET fk_id_cliente = ?, logradouro = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, uf = ?, complemento = ?
            WHERE id_endereco = ?;
        `;
        const values = [
            dados.FkIdCliente,
            dados.Logradouro,
            dados.Numero,
            dados.Bairro,
            dados.Cidade,
            dados.Cep,
            dados.Uf,
            dados.Complemento || null,
            id
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM enderecos_clientes WHERE id_endereco = ?;";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}