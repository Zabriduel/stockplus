import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import enderecoRoutes from "./endereco.cliente.routes";
import telefoneRoutes from "./telefone.routes";
import pessoaRoutes from "./pessoa.route";
import fornecedorRoutes from "./fornecedor.routes";
import loteRoutes from "./lote.routes";
import movimentacaoRoutes from "./movimentacao.routes";
import tipoMovimentacaoRoutes from "./tipo.movimentacao.routes";


const router = Router();

router.use('/', fornecedorRoutes);
router.use('/', loteRoutes);
router.use('/', clienteRoutes);
router.use('/', enderecoRoutes);
router.use('/', telefoneRoutes);
router.use('/', pessoaRoutes)
router.use('/', movimentacaoRoutes);
router.use('/', tipoMovimentacaoRoutes);

export default router;
