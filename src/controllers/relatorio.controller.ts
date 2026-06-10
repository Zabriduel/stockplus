import { Request, Response } from "express";
import { RelatorioService } from "../services/relatorio.service";

export class RelatorioController {
  constructor(private _service = new RelatorioService()) {}
  listarRelatorios = async (req: Request, res: Response) => {
    try {
      const alertas = await this._service.selecionarRelatorios();
      return res.status(200).json(alertas);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };
}
