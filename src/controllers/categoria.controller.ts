import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";
import { validarId } from "../utils/validar.id";

export class CategoriaController {

    constructor(private _service = new CategoriaService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const categorias = await this._service.selecionarTodos();
            return res.status(200).json({ categorias });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    };

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id = validarId(Number(req.params.id));
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }
            const categoria = await this._service.selecionarPorId(id);
            if (categoria.length < 1) {
                return res.status(404).json({ message: "Nenhuma categoria encontrada." });
            }
            return res.status(200).json({ categoria });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    };

    selecionarPorNome = async (req: Request, res: Response) => {
        try {
            const nome = String(req.query.nome);
            const categorias = await this._service.selecionarPorNome(nome);
            if (categorias.length < 1) {
                return res.status(404).json({ message: "Nenhuma categoria encontrada." });
            }
            return res.status(200).json({ categorias });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nome_categoria } = req.body;
            const resultado = await this._service.criar(nome_categoria);
            return res.status(201).json({ message: "Categoria criada com sucesso.", resultado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    };

    editar = async (req: Request, res: Response) => {
        try {
            const id = validarId(Number(req.params.id));
            const { nome_categoria } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }
            const categoria = await this._service.selecionarPorId(id);
            if (categoria.length < 1) {
                return res.status(404).json({ message: "Categoria não encontrada." });
            }
            const resultado = await this._service.editar(id, nome_categoria);
            return res.status(200).json({ message: "Categoria alterada com sucesso.", resultado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const id = validarId(Number(req.params.id));
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }
            const categoria = await this._service.selecionarPorId(id);
            if (categoria.length < 1) {
                return res.status(404).json({ message: "Categoria não encontrada." });
            }
            const resultado = await this._service.deletar(id);
            return res.status(200).json({ message: "Categoria deletada com sucesso.", resultado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
            }
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    };
}