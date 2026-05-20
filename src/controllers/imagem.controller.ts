import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import { validarId } from "../utils/validar.id";
import { ImagemService } from "../services/imagem.service";
import { ImagemProdutoService } from "../services/imagem.produto.service";

export class ImagemController {

    constructor(
        private _service = new ImagemService(),
        private _imagemProdutoService = new ImagemProdutoService()
    ) {}

    selecionarTodos = async (
        req: Request,
        res: Response
    ) => {

        try {

            const imagens =
                await this._service.selecionarTodos();

            return res.status(200).json(imagens);

        } catch (error) {

            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    };

    selecionarPorId = async (
        req: Request,
        res: Response
    ) => {

        try {

            const id = validarId(
                Number(req.params.id)
            );

            const imagem =
                await this._service.selecionarPorId(id);

            if (imagem.length < 1) {
                return res.status(404).json({
                    message: "Imagem não encontrada."
                });
            }

            return res.status(200).json(imagem);

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    };

    editar = async (
        req: Request,
        res: Response
    ) => {

        try {

            const id = validarId(
                Number(req.params.id)
            );

            const imagemAtual =
                await this._service.selecionarPorId(id);

            if (imagemAtual.length < 1) {
                return res.status(404).json({
                    message: "Imagem não encontrada."
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem não enviada."
                });
            }

            const nomeImagemAtual =
                imagemAtual[0].vinculo_imagem;

            const caminhoImagem = path.join(
                process.cwd(),
                "uploads",
                "images",
                nomeImagemAtual
            );

            if (fs.existsSync(caminhoImagem)) {
                fs.unlinkSync(caminhoImagem);
            }

            const resultado =
                await this._service.editar(
                    id,
                    req.file.filename
                );

            return res.status(200).json({
                message: "Imagem atualizada com sucesso.",
                resultado
            });

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    };

    deletar = async (
        req: Request,
        res: Response
    ) => {

        try {

            const id = validarId(
                Number(req.params.id)
            );

            const imagem =
                await this._service.selecionarPorId(id);

            if (imagem.length < 1) {
                return res.status(404).json({
                    message: "Imagem não encontrada."
                });
            }

            const nomeImagem =
                imagem[0].vinculo_imagem;

            const caminhoImagem = path.join(
                process.cwd(),
                "uploads",
                "images",
                nomeImagem
            );

            if (fs.existsSync(caminhoImagem)) {
                fs.unlinkSync(caminhoImagem);
            }

            await this._imagemProdutoService
                .deletar(id);

            await this._service.deletar(id);

            return res.status(200).json({
                message: "Imagem deletada com sucesso."
            });

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    };
}