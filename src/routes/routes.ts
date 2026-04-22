import { Router } from "express";
import movimentacaoRoutes from "./movimentacao.routes";
import tipoMovimentacaoRoutes from "./tipo.movimentacao.routes";

const router = Router();
router.use('/', movimentacaoRoutes);
router.use('/', tipoMovimentacaoRoutes)
export default router;