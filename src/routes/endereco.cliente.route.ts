import { Router } from "express";
import { EnderecoClienteController } from "../controllers/endereco.cliente.controller";

const enderecoRoutes = Router();
const enderecoController = new EnderecoClienteController();

enderecoRoutes.get("/enderecos", enderecoController.selecionarTodos);
enderecoRoutes.get("/enderecos/:id", enderecoController.selecionarPorId);
enderecoRoutes.get("/clientes/:id_cliente/enderecos", enderecoController.selecionarPorCliente);
enderecoRoutes.post("/clientes/:id/enderecos", enderecoController.criar);
enderecoRoutes.patch("/enderecos/:id", enderecoController.editar);
enderecoRoutes.delete("/enderecos/:id", enderecoController.deletar);

export default enderecoRoutes;