import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { IProduto, Produto } from "../models/produto.model";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const sql = `
            SELECT p.id_produto, p.nome_produto, p.valor_produto, p.data_cadastro, c.nome_categoria
            FROM produtos p
            INNER JOIN categorias c
                ON c.id_categoria = p.fk_id_categoria
            ORDER BY p.id_produto;
        `;
        const [rows] = await db.execute<IProduto[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<IProduto[]> {
        const sql = `
            SELECT p.id_produto, p.nome_produto, p.valor_produto, p.data_cadastro, c.nome_categoria
            FROM produtos p
            INNER JOIN categorias c
                ON c.id_categoria = p.fk_id_categoria
            WHERE p.id_produto = ?;
        `;
        const [rows] = await db.execute<IProduto[]>(sql, [id]);
        return rows;
    }

    async create(produto: Produto): Promise<ResultSetHeader> {
        const sql = `INSERT INTO produtos (fk_id_categoria, nome_produto, valor_produto) VALUES (?, ?, ?);`;
        const values = [produto.idCategoria, produto.nome, produto.valor];
        const [result] = await db.execute<ResultSetHeader>(sql,values);
        return result;
    }

    async update(id: number, produto: Produto): Promise<ResultSetHeader> {
        const sql = `UPDATE produtos SET fk_id_categoria = ?, nome_produto = ?, valor_produto = ? WHERE id_produto = ?;`;
        const values = [produto.idCategoria, produto.nome, produto.valor, id];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = `DELETE FROM produtos WHERE id_produto = ?;`;
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }
}