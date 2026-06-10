import { Request, Response } from "express";
import { LoteService } from "../services/lote.service";

export class LoteController {
    constructor(private _service = new LoteService()) { }

    selecionar = async (req: Request, res: Response) => {
        try {
            const lotes = await this._service.selecionarTodos();
            if (lotes.length === 0) {
                res
                    .status(200)
                    .json({ message: "Nenhum lote encontrado", lotes });
            }
            return res.status(200).json({ lotes });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        message: "Ocorreu um erro no servidor",
                        errorMessage: error.message,
                    });
            }
            return res
                .status(500)
                .json({
                    message: "Ocorreu um erro no servidor",
                    errorMessage: "Erro desconhecido",
                });
        }
    };
    criar = async (req: Request, res: Response) => {
        try {
            const { lote, qtdLote, dataVencimento } = req.body;
            const fkIdProduto = Number(req.query.fkIdProduto);
            const fkIdFornecedor = Number(req.query.fkIdFornecedor);

            const novo = await this._service.criar(fkIdProduto, fkIdFornecedor, lote, qtdLote, dataVencimento);
            res.status(201).json({ message: "Registro incluido com sucesso", novo });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        message: "Ocorreu um erro no servidor",
                        errorMessage: error.message,
                    });
            }
            return res
                .status(500)
                .json({
                    message: "Ocorreu um erro no servidor",
                    errorMessage: "Erro desconhecido",
                });
        }
    };
    editar = async (req: Request, res: Response) => {
        const idLote = Number(req.query.idLote);
        const fkIdProduto = Number(req.query.fkIdProduto);
        const fkIdFornecedor = Number(req.query.fkIdFornecedor);
        const { lote, qtdLote, dataVencimento } = req.body;

        const loteAtual = await this._service.selecionarPorID(idLote);

        if (loteAtual.length === 0) {
            res.status(200).json({ message: "Nenhum lote encontrado" });
        }


        const novoProduto = fkIdProduto || loteAtual[0].fk_id_produto;
        const novoFornecedor = fkIdFornecedor || loteAtual[0].fk_id_fornecedor;
        const novoLote = lote || loteAtual[0].lote;        
        const novaQuantidade = qtdLote || loteAtual[0].qtd_lote;
        const novaDataVencimento = dataVencimento || loteAtual[0].data_vencimento;


        const alterado = await this._service.editar(novoProduto, novoFornecedor, novoLote, novaQuantidade, novaDataVencimento, idLote);

        res.status(201).json({ message: "Registro alterado com sucesso", alterado });

    };
    deletar = async (req: Request, res: Response) => {
        try {
            const idLote = Number(req.query.idLote);

            if (!idLote || isNaN(idLote)) {
                throw new Error("Valor para ID inválido.");
            }
            const verificarId = await this._service.selecionarPorID(idLote);
            if (verificarId.length === 0) {
                res
                    .status(200)
                    .json({ message: "Nenhum registro encontrado para esse ID." });
            }
            const resultado = await this._service.deletar(idLote);
            res.status(200).json({ resultado });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: "Ocorreu um erro no servidor.",
                    errorMessage: error.message,
                });
            }
            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: "Erro desconhecido",
            });
        }
    };
}
