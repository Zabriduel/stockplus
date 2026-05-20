import { RowDataPacket } from "mysql2";
import { validarId } from "../utils/validar.id";

export interface IPedido extends RowDataPacket {
    id_pedido?: number;
    fk_id_cliente: number;
    valor_total: number;
    qtd_itens: number;
    data_pedido?: Date;
}

export class Pedido {
    private _idPedido?: number;
    private _idCliente: number;
    private _valorTotal: number;
    private _qtdItens: number;

    constructor(idCliente: number, valorTotal: number, qtdItens: number, idPedido?: number) {
        this._idCliente = validarId(idCliente);
        this._valorTotal = this._validarValorTotal(valorTotal);
        this._qtdItens = this._validarQtdItens(qtdItens);
        if (idPedido) {
            this._idPedido = validarId(idPedido);
        }
    }

    public get idPedido(): number | undefined {
        return this._idPedido;
    }

    public get idCliente(): number {
        return this._idCliente;
    }

    public get valorTotal(): number {
        return this._valorTotal;
    }

    public get qtdItens(): number {
        return this._qtdItens;
    }

    public static criar(idCliente: number, valorTotal: number, qtdItens: number): Pedido {
        return new Pedido(idCliente, valorTotal, qtdItens);
    }

    public static editar(idPedido: number, idCliente: number, valorTotal: number, qtdItens: number): Pedido {
        return new Pedido(idCliente, valorTotal, qtdItens, idPedido);
    }

    private _validarValorTotal(value: number): number {
        if (value === undefined || value === null || isNaN(value)) {
            throw new Error("Valor total inválido.");
        }
        if (value < 0) {
            throw new Error("Valor total não pode ser negativo.");
        }
        return value;
    }

    private _validarQtdItens(value: number): number {
        if (value === undefined || value === null || isNaN(value)) {
            throw new Error("Quantidade de itens inválida.");
        }
        if (value < 0) {
            throw new Error("Quantidade de itens não pode ser negativa.");
        }
        if (!Number.isInteger(value)) {
            throw new Error("Quantidade de itens deve ser um número inteiro.");
        }
        return value;
    }
}