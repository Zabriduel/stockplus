import { Router } from "express";
import { LoteController } from "../controllers/lote.controller";

const loteController = new LoteController();
const loteRoutes = Router()

loteRoutes.get('/lotes', loteController.selecionar);
loteRoutes.post('/lotes', loteController.criar);
loteRoutes.patch('/lotes', loteController.editar);
loteRoutes.delete('/lotes', loteController.deletar);


export default loteRoutes;