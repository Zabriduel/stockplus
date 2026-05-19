import { Router } from "express";
import { TelefoneController } from "../controllers/telefone.controller";

const telefoneRoutes = Router();
const telefoneController = new TelefoneController();

telefoneRoutes.get("/telefones", telefoneController.selecionarTodos);
telefoneRoutes.get("/telefones/:id", telefoneController.selecionarPorId);
telefoneRoutes.post("/telefones", telefoneController.criar);
telefoneRoutes.patch("/telefones/:id", telefoneController.editar);
telefoneRoutes.delete("/telefones/:id", telefoneController.deletar);

export default telefoneRoutes;