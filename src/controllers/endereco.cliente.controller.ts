import { Request, Response } from "express";
import { EnderecoClienteService } from "../services/endereco.cliente.service";

export class EnderecoClienteController {
    constructor(private _service = new EnderecoClienteService()) {}

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const dados = await this._service.selecionarTodos();
            return res.json(dados);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const dados = await this._service.selecionarPorId(id);
            return res.json(dados);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    selecionarPorCliente = async (req: Request, res: Response) => {
        try {
            const idCliente = Number(req.params.id);
            const dados = await this._service.selecionarPorCliente(idCliente);
            return res.json(dados);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const idCliente = Number(req.params.id);
            const { cep, numero, complemento } = req.body;
            const resultado = await this._service.criar(idCliente, cep, numero, complemento);
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
            const { fk_id_cliente, cep, numero, complemento } = req.body;
            const resultado = await this._service.editar(id, fk_id_cliente, cep, numero, complemento);
            return res.json(resultado);
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
            return res.json(resultado);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };
}