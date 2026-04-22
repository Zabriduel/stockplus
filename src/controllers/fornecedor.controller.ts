import { FornecedorService } from "../services/fornecedor.services";
import { Request, Response } from "express";

export class FornecedorController {
    constructor(private _service = new FornecedorService()) { }

    selecionar = async (req: Request, res: Response) => {
        try {
            const fornecedores = await this._service.selecionarTodos();
            if (fornecedores.length === 0) {
                res.status(200).json({ message: "Nenhum fornecedor encontrado", fornecedores });
            }
            return res.status(200).json({ fornecedores });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const { nomeFantasia, cnpj } = req.body;

            const novo = await this._service.criar(nomeFantasia, cnpj);
            res.status(201).json({ message: "Registro incluido com sucesso", novo });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    editar = async (req: Request, res: Response) => {
        const idFornecedor = Number(req.query);
        const { nomeFantasia, cnpj } = req.body;

        const fornecedorAtual = await this._service.selecionarPorID(idFornecedor);
        if (fornecedorAtual.length === 0) {
            res.status(200).json({ message: "Nenhum fornecedor encontrado" });
        }

        const novoNome = nomeFantasia || fornecedorAtual[0].nomeFornecedor
        const novoCnpj = cnpj || fornecedorAtual[0].cnpj

    }
}