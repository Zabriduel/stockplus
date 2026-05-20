import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { Categoria, ICategoria } from "../models/categoria.model";

export class CategoriaRepository {

    async findAll(): Promise<ICategoria[]> {
        const sql = `SELECT * FROM categorias;`;
        const [rows] = await db.execute<ICategoria[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<ICategoria[]> {
        const sql = `SELECT * FROM categorias WHERE id_categoria = ?;`;
        const values = [id];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        return rows;
    }

    async findByName(nome: string): Promise<ICategoria[]> {
        const sql = `SELECT * FROM categorias WHERE nome_categoria = ?;`;
        const values = [nome];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        return rows;
    }

    async create(categoria: Categoria): Promise<ResultSetHeader> {
        const sql = `INSERT INTO categorias (nome_categoria) VALUES (?);`;
        const values = [categoria.NomeCategoria];
        const [result] = await db.execute<ResultSetHeader>(sql,values);
        return result;
    }

    async update(id: number, categoria: Categoria): Promise<ResultSetHeader> {
        const sql = `UPDATE categorias SET nome_categoria = ? WHERE id_categoria = ?;`;
        const values = [categoria.NomeCategoria, id];
        const [result] = await db.execute<ResultSetHeader>(sql,values);
        return result;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = `DELETE FROM categorias WHERE id_categoria = ?;`;
        const values = [id];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
}