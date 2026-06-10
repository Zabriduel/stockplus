import { Router } from "express";
import { RelatorioController } from "../controllers/relatorio.controller";

const relatorioRoutes = Router();
const relatorioController = new RelatorioController();

relatorioRoutes.get("/relatorios", (req, res) =>
  relatorioController.listarRelatorios(req, res),
);
export default relatorioRoutes;
