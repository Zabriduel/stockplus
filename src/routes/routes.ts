import { Router } from "express";
import fornecedorRoutes from "./fornecedor.routes";
import loteRoutes from "./lote.routes";

const router = Router();
router.use('/', fornecedorRoutes);
router.use('/', loteRoutes);

export default router;