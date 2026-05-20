import { Router } from "express";

import { ImagemController } from "../controllers/imagem.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const imagemRoutes = Router();
const imagemController = new ImagemController();

imagemRoutes.get("/imagens", imagemController.selecionarTodos);
imagemRoutes.get("/imagens/:id", imagemController.selecionarPorId);
imagemRoutes.patch("/imagens/:id", uploadImage, imagemController.editar);
imagemRoutes.delete("/imagens/:id", imagemController.deletar);

export default imagemRoutes;