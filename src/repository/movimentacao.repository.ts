import { db } from "../database/connection.database";
import { IMovimentacao } from "../models/movimentacao.model";
import { ResultSetHeader } from "mysql2";

export class MovimentacaoRepository {
  async selectAll(): Promise<IMovimentacao[]> {
    const [rows] = await db.execute<IMovimentacao[]>(
      "SELECT * FROM movimentacoes;",
    );
    return rows;
  }

  async select(id: number): Promise<IMovimentacao[]> {
    const sql = "SELECT * FROM movimentacoes WHERE id_movimentacoes = ?;";
    const values = [id];
    const [rows] = await db.execute<IMovimentacao[]>(sql, values);
    return rows;
  }

  async selectLote(idLote: number): Promise<IMovimentacao[]> {
    const sql = "SELECT * FROM movimentacoes WHERE fk_id_lote = ?;";
    const values = [idLote];
    const [rows] = await db.execute<IMovimentacao[]>(sql, values);
    return rows;
  }

  async create(dados: Omit<IMovimentacao, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO movimentacoes (fk_id_lote, fk_id_tipo_mov, qnt_movimentada, data_movimentacao) VALUES (?,?,?,?);';
        const values = [dados._fkIdLote, dados._fkIdTipoMov, dados._qntMovimentada, dados._dataMovimentacao];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<IMovimentacao, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE movimentacoes SET fk_id_lote=?, fk_id_tipo_mov=?, qnt_movimentada=?, data_movimentacao=? WHERE id_movimentacoes =?;';
        const values = [dados._fkIdLote, dados._fkIdTipoMov, dados._qntMovimentada, dados._dataMovimentacao, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM movimentacoes WHERE id_movimentacoes=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}
