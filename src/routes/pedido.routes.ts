import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controller";

const pedidoRoutes = Router();
const pedidoController = new PedidoController();

pedidoRoutes.get("/pedidos", pedidoController.selecionarTodos);
pedidoRoutes.get("/pedidos/:id", pedidoController.selecionarPorId);
pedidoRoutes.get("/clientes/:idCliente/pedidos", pedidoController.selecionarPorCliente);
pedidoRoutes.post("/pedidos", pedidoController.criar);
pedidoRoutes.patch("/pedidos/:id", pedidoController.editar);
pedidoRoutes.delete("/pedidos/:id", pedidoController.deletar);

export default pedidoRoutes;