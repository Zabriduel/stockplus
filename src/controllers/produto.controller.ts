import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";
import { validarId } from "../utils/validar.id";

export class ProdutoController {

    constructor(private _service = new ProdutoService()) { }
    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionarTodos();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    };

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id = validarId(Number(req.params.id));
            const produto = await this._service.selecionarPorId(id);
            if (produto.length < 1) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            return res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nome_produto, valor_produto, fk_id_categoria } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem do produto não enviada."
                });
            }

            const resultado = await this._service.criar(
                nome_produto,
                Number(valor_produto),
                Number(fk_id_categoria),
                req.file.filename
            );

            return res.status(201).json({
                message: "Produto criado com imagem com sucesso.",
                resultado,
                imagem: req.file.filename
            });

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        };
    };

    editar = async (req: Request, res: Response) => {
        try {
            const id = validarId(Number(req.params.id));
            const { nome_produto, valor_produto, fk_id_categoria } = req.body;
            const produto = await this._service.selecionarPorId(id);
            if (produto.length < 1) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            const resultado = await this._service.editar(id, nome_produto, Number(valor_produto), Number(fk_id_categoria));
            return res.status(200).json({ message: "Produto atualizado com sucesso.", resultado });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const id = validarId(Number(req.params.id));
            const produto = await this._service.selecionarPorId(id);
            if (produto.length < 1) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            await this._service.deletar(id);
            return res.status(200).json({ message: "Produto deletado com sucesso." });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    };
}