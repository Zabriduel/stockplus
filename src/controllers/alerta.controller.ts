import { Request, Response } from "express";
import { AlertaService } from "../services/alertas.service";

export class AlertaController {
  constructor(private _service = new AlertaService()) {}
  listarAlertas = async (req: Request, res: Response) => {
    try {
      const alertas = await this._service.gerarAlertas();
      return res.status(200).json(alertas);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };
}
