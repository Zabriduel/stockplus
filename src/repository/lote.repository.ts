import { db } from "../database/connection.database";
import { ILote } from "../models/lote.models"
import { ResultSetHeader } from "mysql2";

export class LoteRepository {
    async findAll(): Promise<ILote[]> {
        const [rows] = await db.execute<ILote[]>(
            'SELECT * FROM lotes;'
        );
        return rows;
    }
    async findById(idLote: number): Promise<ILote[]> {
        const sql = 'SELECT * FROM lotes WHERE id_lote=?;';
        const values = [idLote];
        const [rows] = await db.execute<ILote[]>(sql, values);
        return rows;
    }
    async create(dados: Omit<ILote, 'idLote'>): Promise<ResultSetHeader> {

        console.log(dados);
        const sql = 'INSERT INTO lotes (fk_id_produto,fk_id_fornecedor,lote,qtd_lote, data_vencimento) VALUES (?,?,?,?,STR_TO_DATE(?, "%m-%d-%Y"))';
        const values = [dados._fkIdProduto, dados._fkIdFornecedor, dados._lote, dados._qtdLote, dados._dataVencimento];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }
    async update(id: number, dados: Omit<ILote, 'idLote'>): Promise<ResultSetHeader> {

        const sql = 'UPDATE lotes SET fk_id_produto =?, fk_id_fornecedor=?,lote=?, qtd_lote=?, data_vencimento=? WHERE id_lote =?;';
        const values = [dados._fkIdProduto, dados._fkIdFornecedor, dados._lote, dados._qtdLote, dados._dataVencimento, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM lotes WHERE id_lote = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}
