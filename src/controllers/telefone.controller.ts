import { Request, Response } from "express";
import { TelefoneService } from "../services/telefone.service";

export class TelefoneController {

    constructor(private _service = new TelefoneService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const telefones = await this._service.selecionarTodos();
            return res.status(200).json(telefones);
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
            const telefone = await this._service.selecionarPorId(id);
            return res.status(200).json(telefone);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { telefone, fk_id_pessoa } = req.body;
            const resultado = await this._service.criar(telefone, fk_id_pessoa);
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
            const { telefone, fk_id_pessoa } = req.body;
            const resultado = await this._service.editar(id, telefone, fk_id_pessoa);
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