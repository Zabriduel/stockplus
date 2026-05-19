import { Router } from "express";
import clienteRoutes from "./cliente.route";
import enderecoRoutes from "./endereco.cliente.route";
import telefoneRoutes from "./telefone.routes";
import pessoaRoutes from "./pessoa.route";
import fornecedorRoutes from "./fornecedor.routes";
import loteRoutes from "./lote.routes";

const router = Router();

router.use('/', fornecedorRoutes);
router.use('/', loteRoutes);
router.use('/', clienteRoutes);
router.use('/', enderecoRoutes);
router.use('/', telefoneRoutes);
router.use('/', pessoaRoutes);

export default router;
