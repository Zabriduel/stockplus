import { Request, Response } from "express";
import { TipoMovimentacaoService } from "../services/tipo.movimentacao.service";

export class TipoMovimentacaoController {
  constructor(private _service = new TipoMovimentacaoService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);

      if (!id) {
        const tiposMovimentacoes = await this._service.selecionarTodos();
        if (tiposMovimentacoes.length < 1) {
          res.status(200).json({ message: "Nenhum registro encontrado." });
        }
        res.status(200).json({
          message: "Registros identificados com sucesso!",
          data: tiposMovimentacoes,
        });
      }

      if (id) {
        const tiposMovimentacoes = await this._service.selecionarUm(id);
        if (tiposMovimentacoes.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse ID." });
        }
        res.status(200).json({
          message: "Registro identificado com sucesso!",
          data: tiposMovimentacoes,
        });
      }
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
      const { tipoMov } = req.body;
      const resultado = await this._service.criar(tipoMov);
      res
        .status(201)
        .json({
          message: "Novo registro inserido com sucesso!",
          data: resultado,
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
      const { tipoMov } = req.body;
      const id = Number(req.query.id);
      const checarExistencia = await this._service.selecionarUm(id);
      if (checarExistencia.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }

      const resultado = await this._service.editar(id, tipoMov);
      res
        .status(200)
        .json({ message: "Registro alterado com sucesso!", data: resultado });
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
      const checarExistencia = await this._service.selecionarUm(id);
      if (checarExistencia.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }

      const resultado = await this._service.deletar(id);
      res
        .status(200)
        .json({ message: "Registro excluído com sucesso!", data: resultado });
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
}
