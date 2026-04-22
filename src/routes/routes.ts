import { Router } from "express";
import clienteRoutes from "./cliente.route";
import enderecoRoutes from "./endereco.cliente.route";

const router = Router();
router.use('/', clienteRoutes);
router.use('/', enderecoRoutes);

export default router;
