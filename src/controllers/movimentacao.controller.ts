import { Request, Response } from "express";
import { MovimentacaoService } from "../services/movimentacao.service";

export class MovimentacaoController {
  constructor(private _service = new MovimentacaoService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      const idLote = Number(req.query.idLote);

      if (!id && !idLote) {
        const movimentacoes = await this._service.selecionarTodos();
        if (movimentacoes.length < 1) {
          res.status(200).json({ message: "Nenhum registro encontrado." });
        }
        res.status(200).json({
          message: "Registros identificados com sucesso!",
          data: movimentacoes,
        });
      }

      if (id) {
        const movimentacoes = await this._service.selecionarUm(id);
        if (movimentacoes.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse ID." });
        }
        res.status(200).json({
          message: "Registro identificado com sucesso!",
          data: movimentacoes,
        });
      }

      if (idLote) {
        const movimentacoes = await this._service.selecionarPorLote(idLote);
        if (movimentacoes.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse lote." });
        }
        res.status(200).json({
          message: "Registro identificado com sucesso!",
          data: movimentacoes,
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
      const { idLote, idTipoMov, qntMovimentada, dataMovimentacao } = req.body;
      const resultado = await this._service.criar(
        idLote,
        idTipoMov,
        qntMovimentada,
        dataMovimentacao,
      );
      res.status(201).json({ message: "Novo registro inserido com sucesso!",data: resultado });
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
      const { idLote, idTipoMov, qntMovimentada, dataMovimentacao } = req.body;
      const id = Number(req.query.id);
      const checarExistencia = await this._service.selecionarUm(id);
      if (checarExistencia.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }

      const resultado = await this._service.editar(id, idLote, idTipoMov, qntMovimentada, dataMovimentacao);
      res.status(200).json({message: "Registro alterado com sucesso!", data: resultado });

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
      res.status(200).json({message: "Registro excluído com sucesso!", data: resultado });

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
