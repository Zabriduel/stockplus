import { db } from "../database/connection.database";
import { ILote } from "../models/lote.models"

export class RelatorioRepository {
    async findAll(): Promise<ILote[]> {
        const [rows] = await db.execute<ILote[]>(
            'SELECT * FROM vw_lote_relatorio;'
        );
        return rows;
    }
}