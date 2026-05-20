import { db } from "../database/connection.database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { ItemPedido } from "../models/itens.pedido.model";

export class ItemPedidoRepository {

    async findAll(): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                ip.id_itens_pedido,
                ip.quantidade,
                p.id_produto,
                p.nome_produto,
                pe.id_pedido
            FROM itens_pedido ip
            INNER JOIN produtos p
                ON ip.fk_id_produto = p.id_produto
            INNER JOIN pedidos pe
                ON ip.fk_id_pedido = pe.id_pedido;
        `;
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                ip.id_itens_pedido,
                ip.quantidade,
                p.id_produto,
                p.nome_produto,
                pe.id_pedido
            FROM itens_pedido ip
            INNER JOIN produtos p
                ON ip.fk_id_produto = p.id_produto
            INNER JOIN pedidos pe
                ON ip.fk_id_pedido = pe.id_pedido
            WHERE ip.id_itens_pedido = ?;
        `;
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows;
    }

    async create(dados: ItemPedido): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO itens_pedido (fk_id_produto, fk_id_pedido, quantidade) VALUES (?, ?, ?);';
        const values = [dados.FKIdProduto, dados.FKIdPedido, dados.Quantidade];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: ItemPedido): Promise<ResultSetHeader> {
        const sql = 'UPDATE itens_pedido SET fk_id_produto = ?, fk_id_pedido = ?, quantidade = ? WHERE id_itens_pedido = ?;';
        const values = [dados.FKIdProduto, dados.FKIdPedido, dados.Quantidade, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM itens_pedido WHERE id_itens_pedido = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}