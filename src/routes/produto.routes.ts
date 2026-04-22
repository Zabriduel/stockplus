import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const produtoController = new ProdutoController();

const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionar);
produtoRoutes.post('/produtos', uploadImage, produtoController.inserir);
produtoRoutes.patch('/produtos', uploadImage, produtoController.alterar);
produtoRoutes.delete('/produtos', produtoController.deletar);

export default produtoRoutes;