import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const clienteRoutes = Router();
const clienteController = new ClienteController();

clienteRoutes.get("/clientes", clienteController.selecionarTodos);
clienteRoutes.get("/clientes/:id", clienteController.selecionarPorId);
clienteRoutes.post("/clientes", clienteController.criar);
clienteRoutes.patch("/clientes/:id", clienteController.editar);
clienteRoutes.delete("/clientes/:id", clienteController.deletar);

export default clienteRoutes;