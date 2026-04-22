import { db } from "../database/connection.database";
import { ProdutoFornecedor } from "../models/produto.fornecedor.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ProdutoFornecedorRepository {
    async findAll():Promise<ProdutoFornecedor[]> {
        const [rows] = await db.execute<ProdutoFornecedor[]>(
            'SELECT * FROM produto_fornecedor'
        )
        return rows;
    }
}