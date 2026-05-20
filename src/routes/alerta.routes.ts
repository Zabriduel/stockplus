import { Router } from "express";
import { AlertaController } from "../controllers/alerta.controller";

const alertaRoutes = Router();
const alertaController = new AlertaController();

alertaRoutes.get("/alertas", (req, res) =>
  alertaController.listarAlertas(req, res),
);
export default alertaRoutes;
