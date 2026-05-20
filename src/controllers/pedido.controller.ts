import {Request, Response} from 'express';
import { PedidoService } from "../services/pedido.service";

export class PedidoController {

    constructor(private _service = new PedidoService()) {}

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const pedidos = await this._service.selecionarTodos();
            return res.status(200).json({pedidos});
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const pedido = await this._service.selecionarPorId(id);
            if (pedido.length === 0) {
                return res.status(404).json({ message: "Pedido não encontrado." });
            }
            return res.status(200).json({ pedido });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    selecionarPorCliente = async ( req: Request, res: Response ) => {
        try {
            const idCliente = Number(req.params.idCliente);
            const pedidos = await this._service.selecionarPorCliente(idCliente);
            return res.status(200).json({ pedidos });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    criar = async ( req: Request, res: Response ) => {
        try {
            const { fk_id_cliente, valor_total, qtd_itens } = req.body;
            const resultado = await this._service.criar(Number(fk_id_cliente), Number(valor_total ?? 0), Number(qtd_itens ?? 0));
            return res.status(201).json({ message: "Pedido criado com sucesso.", resultado });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    editar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { fk_id_cliente, valor_total, qtd_itens } = req.body;
            const resultado = await this._service.editar(id,
                    fk_id_cliente !== undefined
                        ? Number(fk_id_cliente)
                        : fk_id_cliente,
                    valor_total !== undefined
                        ? Number(valor_total)
                        : valor_total,
                    qtd_itens !== undefined
                        ? Number(qtd_itens)
                        : qtd_itens
                );
            return res.status(200).json({ message: "Pedido atualizado com sucesso.", resultado });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const resultado = await this._service.deletar(id);
            return res.status(200).json({ message: "Pedido deletado com sucesso.", resultado});
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };
}