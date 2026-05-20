import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaRoutes = Router();
const categoriaController = new CategoriaController();

categoriaRoutes.get("/categorias", categoriaController.selecionarTodos);
categoriaRoutes.get("/categorias/:id", categoriaController.selecionarPorId);
categoriaRoutes.get("/categorias/nome/busca", categoriaController.selecionarPorNome);
categoriaRoutes.post("/categorias", categoriaController.criar);
categoriaRoutes.patch("/categorias/:id", categoriaController.editar);
categoriaRoutes.delete("/categorias/:id", categoriaController.deletar);

export default categoriaRoutes;