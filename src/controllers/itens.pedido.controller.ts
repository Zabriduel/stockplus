import { Request, Response } from "express";
import { ItemPedidoService } from "../services/itens.pedido.service";

export class ItemPedidoController {

    constructor(private _service = new ItemPedidoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const itensPedido = await this._service.selecionarTodos();
            return res.status(200).json(itensPedido);
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
            const itemPedido = await this._service.selecionarPorId(id);
            return res.status(200).json(itemPedido);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const {
                fk_id_produto,
                fk_id_pedido,
                quantidade
            } = req.body;
            const resultado = await this._service.criar(
                fk_id_produto,
                fk_id_pedido,
                quantidade
            );

            return res.status(201).json(resultado);
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
            const {
                fk_id_produto,
                fk_id_pedido,
                quantidade
            } = req.body;
            const resultado = await this._service.editar(
                id,
                fk_id_produto,
                fk_id_pedido,
                quantidade
            );
            return res.status(200).json(resultado);
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
            return res.status(200).json(resultado);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };
}