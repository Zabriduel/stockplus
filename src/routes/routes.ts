import { Router } from "express";
import movimentacaoRoutes from "./movimentacao.routes";

const router = Router();
router.use('/', movimentacaoRoutes)
export default router;