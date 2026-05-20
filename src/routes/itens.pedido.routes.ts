import { Router } from "express";
import { ItemPedidoController } from "../controllers/itens.pedido.controller";

const itensRoutes = Router();

const itensController = new ItemPedidoController();

itensRoutes.get("/itens-pedido", itensController.selecionarTodos);
itensRoutes.get("/itens-pedido/:id", itensController.selecionarPorId);
itensRoutes.post("/itens-pedido", itensController.criar);
itensRoutes.patch("/itens-pedido/:id", itensController.editar);
itensRoutes.delete("/itens-pedido/:id", itensController.deletar);

export default itensRoutes;