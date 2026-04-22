import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

export class ClienteController {
    constructor(private _service = new ClienteService()) {}

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const clientes = await this._service.selecionarTodos();
            return res.status(200).json(clientes);
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
            const cliente = await this._service.selecionarPorId(id);
            return res.status(200).json(cliente);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nome_cliente, email, cpf } = req.body;
            const resultado = await this._service.criar(nome_cliente, email, cpf);
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
            const { nome_cliente, email, cpf } = req.body;
            const resultado = await this._service.editar(id, nome_cliente, email, cpf);
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