import { Request, Response } from "express";
import { PessoaService } from "../services/pessoa.service";

export class PessoaController {
    constructor(private _service = new PessoaService()) {}

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const pessoas = await this._service.selecionarTodos();
            return res.status(200).json(pessoas);
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
            const pessoa = await this._service.selecionarPorId(id);
            return res.status(200).json(pessoa);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nome } = req.body;
            const resultado = await this._service.criar(nome);
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
            
            const { nome } = req.body;
            const resultado = await this._service.editar(id, nome);
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