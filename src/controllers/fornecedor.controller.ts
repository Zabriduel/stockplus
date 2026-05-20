import { FornecedorService } from "../services/fornecedor.services";
import { PessoaService } from "../services/pessoa.service";
import { Request, Response } from "express";

export class FornecedorController {
  constructor(private _service = new FornecedorService(), private _pessoaService = new PessoaService()) { }

  selecionar = async (req: Request, res: Response) => {
    try {
      const fornecedores = await this._service.selecionarTodos();
      if (fornecedores.length === 0) {
        res
          .status(200)
          .json({ message: "Nenhum fornecedor encontrado", fornecedores });
      }
      return res.status(200).json({ fornecedores });
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
      const { nomeFantasia, cnpj } = req.body;

      const novo = await this._service.criar(nomeFantasia, cnpj);
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
    try {
      const idFornecedor = Number(req.query.idFornecedor);
      const { nomeFantasia, cnpj } = req.body;
      const idPessoa = Number(req.query.idPessoa);

      const fornecedorAtual = await this._service.selecionarPorID(idFornecedor);

      if (fornecedorAtual.length === 0) {
        return res.status(200).json({ message: "Nenhum fornecedor encontrado" });
      }

      const pessoa = await this._pessoaService.selecionarPorId(idPessoa);

      const novoNome = nomeFantasia || fornecedorAtual[0].nomeFornecedor;
      const novoCnpj = cnpj || fornecedorAtual[0].cnpj;
      const novaPessoa = idPessoa || fornecedorAtual[0].fkIdPessoa as number;
      const alterado = await this._service.editar(
        idFornecedor,
        novoNome,
        novoCnpj,
        novaPessoa
      );


      res.status(201).json({ message: "Registro alterado com sucesso", alterado });
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
  deletar = async (req: Request, res: Response) => {
    try {
      const idFornecedor = Number(req.query.idFornecedor);

      if (!idFornecedor || isNaN(idFornecedor)) {
        throw new Error("Valor para ID inválido.");
      }
      const verificarId = await this._service.selecionarPorID(idFornecedor);
      if (verificarId.length === 0) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado para esse ID." });
      }
      const resultado = await this._service.deletar(idFornecedor);
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
