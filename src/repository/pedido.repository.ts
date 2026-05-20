import { ResultSetHeader } from "mysql2";
import { db } from "../database/connection.database";
import { IPedido, Pedido } from "../models/pedido.model";

export class PedidoRepository {

    async findAll(): Promise<IPedido[]> {
        const sql = `SELECT
                p.id_pedido,
                p.fk_id_cliente,
                p.valor_total,
                p.qtd_itens,
                p.data_pedido,
                c.cpf,
                c.email
            FROM pedidos p
            INNER JOIN clientes c
                ON c.id_cliente = p.fk_id_cliente
            ORDER BY p.id_pedido;`;
        const [rows] = await db.execute<IPedido[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<IPedido[]> {
        const sql = `SELECT
                p.id_pedido,
                p.fk_id_cliente,
                p.valor_total,
                p.qtd_itens,
                p.data_pedido,
                c.cpf,
                c.email
            FROM pedidos p
            INNER JOIN clientes c
                ON c.id_cliente = p.fk_id_cliente
            WHERE p.id_pedido = ?;`;
        const [rows] = await db.execute<IPedido[]>(
            sql,
            [id]
        );

        return rows;
    }

    async findByCliente(idCliente: number): Promise<IPedido[]> {
        const sql = `SELECT * FROM pedidos WHERE fk_id_cliente = ? ORDER BY id_pedido;`;
        const [rows] = await db.execute<IPedido[]>(sql,[idCliente]);
        return rows;
    }

    async create(pedido: Pedido): Promise<ResultSetHeader> {
        const sql = `INSERT INTO pedidos (fk_id_cliente, valor_total, qtd_itens) VALUES (?, ?, ?);`;
        const values = [pedido.idCliente, pedido.valorTotal, pedido.qtdItens];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async update(id: number, pedido: Pedido): Promise<ResultSetHeader> {
        const sql = `UPDATE pedidos SET fk_id_cliente = ?, valor_total = ?, qtd_itens = ? WHERE id_pedido = ?;`;
        const values = [pedido.idCliente, pedido.valorTotal, pedido.qtdItens, id];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = `DELETE FROM pedidos WHERE id_pedido = ?;`;
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }
}