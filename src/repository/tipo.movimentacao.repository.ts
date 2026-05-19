import { db } from "../database/connection.database";
import { ITipoMovimentacao } from "../models/tipo.movimentacao.model";
import { ResultSetHeader } from "mysql2";

export class TipoMovimentacaoRepository {
  async selectAll(): Promise<ITipoMovimentacao[]> {
    const [rows] = await db.execute<ITipoMovimentacao[]>(
      "SELECT * FROM tipos_movimentacoes;",
    );
    return rows;
  }

  async select(id: number): Promise<ITipoMovimentacao[]> {
    const sql = "SELECT * FROM tipos_movimentacoes WHERE id_tipo_mov = ?;";
    const values = [id];
    const [rows] = await db.execute<ITipoMovimentacao[]>(sql, values);
    return rows;
  }


  async create(dados: Omit<ITipoMovimentacao, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO tipos_movimentacoes (tipo_movimentacao) VALUES (?);';
        const values = [dados._tipoMovimentacao];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<ITipoMovimentacao, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE tipos_movimentacoes SET tipo_movimentacao=? WHERE id_tipo_mov =?;';
        const values = [dados._tipoMovimentacao, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM tipos_movimentacoes WHERE id_tipo_mov=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}
