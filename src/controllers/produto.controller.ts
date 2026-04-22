import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";
import path from "path";
import fs from "fs";

export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }

    selecionar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            const nome = String(req.query.nome);

            if (isNaN(id)) {
                res.status(200).json({ message: "Valor de ID inválido." });
            }

            if (id) {
                const produtos = await this._service.selecionarUm(id);
                if (produtos.length < 1) {
                    res
                        .status(200)
                        .json({ message: "Nenhum registro encontrado com esse ID." });
                }
                console.log(produtos);
                res.status(200).json({ produtos });
            }


            const produtos = await this._service.selecionarTodos();
            if (produtos.length < 1) {
                res
                    .status(200)
                    .json({ message: "Nenhum registro encontrado com esse ID." });
            }
            res.status(200).json({ produtos });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({
                    message: "Ocorreu um erro no servidor.",
                    errorMessage: error.message,
                });
            }
            res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: "Erro desconhecido.",
            });
        }
    };

    inserir = async (req: Request, res: Response) => {
        try {
            const { nome, valor } = req.body;
            const idCategoria = Number(req.body.idCategoria);

            if (!req.file) {
                return res.status(400).json({
                    message:
                        "Arquivo não enviado! É necessário enviar a imagem do produto!",
                });
            }
            const resultado = await this._service.inserir(
                nome,
                valor,
                req.file.filename,
                idCategoria,
            );
            res.status(201).json({
                message: "Produto criado com sucesso!",
                resultado: resultado,
                file: {
                    filename: req.file.filename,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                },
            });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({
                    message: "Ocorreu um erro no servidor.",
                    errorMessage: error.message,
                });
            }
            res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: "Erro desconhecido.",
            });
        }
    };

    alterar = async (req: Request, res: Response) => {
        try {
            const { nome, valor } = req.body;
            const idCategoria = Number(req.query.idCategoria);
            const id = Number(req.query.id);

            const produtoSelecionado = await this._service.selecionarUm(id);
            const nomeImg = produtoSelecionado[0].vinculoImagem;

            const caminhoAtualImg = path.join(
                __dirname,
                "../..",
                "uploads",
                "images",
                String(nomeImg),
            );

            console.log(caminhoAtualImg)

            if (fs.existsSync(caminhoAtualImg)) {
                fs.unlinkSync(caminhoAtualImg);
            }

            if (produtoSelecionado.length < 1) {
                res
                    .status(200)
                    .json({ message: "Nenhum produto encontrado com este ID." });
            }

            if (!req.file) {
                return res.status(400).json({
                    message:
                        "Arquivo não enviado! É necessário enviar a imagem do produto!",
                });
            }

            const resultado = await this._service.alterar(
                id,
                nome,
                valor,
                req.file.filename,
                idCategoria,
            );
            res
                .status(200)
                .json({ message: "Produto alterado com sucesso!", data: resultado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({
                    message: "Ocorreu um erro no servidor.",
                    errorMessage: error.message,
                });
            }
            res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: "Erro desconhecido.",
            });
        }
    };
    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            const produtoSelecionado = await this._service.selecionarUm(id);
            if (produtoSelecionado.length < 1) {
                res
                    .status(200)
                    .json({ message: "Nenhum registro encontrado com esse ID." });
            }

            const nomeImg = produtoSelecionado[0].vinculoImagem;

            const caminhoAtualImg = path.join(
                __dirname,
                "../..",
                "uploads",
                "images",
                String(nomeImg),
            );

            console.log(caminhoAtualImg)

            if (fs.existsSync(caminhoAtualImg)) {
                fs.unlinkSync(caminhoAtualImg);
            }

            const resultado = await this._service.deletar(id);
            console.log(resultado);
            res.status(200).json({
                message: "Produto deletado com sucesso!",
                resultado: resultado,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: "Ocorreu um erro no servidor.",
                    errorMessage: error.message,
                });
            }
            res.status(500).json({
                message: "Ocorreu um erro no servidor.",
                errorMessage: "Erro desconhecido.",
            });
        }
    };
}