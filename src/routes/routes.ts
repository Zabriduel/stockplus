import { Router } from "express";
import fornecedorRoutes from "./fornecedor.routes";

const router = Router();
router.use('/', fornecedorRoutes);

export default router;