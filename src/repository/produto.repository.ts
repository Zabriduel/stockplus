import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2";

export class ProdutoRepository {
    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos;'
        )
        return rows;
    }

    async findOne(id: number): Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos WHERE id_produto=?;';
        const values = [id];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectName(nome: string): Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos WHERE nome_produto=?;';
        const values = [nome];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async inserir(dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO produtos (nome_produto, valor_produto, vinculo_imagem, fk_id_categoria) VALUES (?,?,?,?);';
        const values = [dados._nomeProduto, dados._valorProduto, dados._vinculoImagem, dados._idCategoria];
        console.log(`INSERT PRODUTO REPO: ${values}`)
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE produtos SET nome_produto=?, valor_produto=?, vinculo_imagem=?, fk_id_categoria=? WHERE id_produto=?;';
        const values = [dados.nomeProduto, dados._valorProduto, dados._vinculoImagem, dados._idCategoria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM produtos WHERE id_produto=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}