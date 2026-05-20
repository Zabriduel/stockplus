import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import enderecoRoutes from "./endereco.cliente.routes";
import telefoneRoutes from "./telefone.routes";
import pessoaRoutes from "./pessoa.routes";
import fornecedorRoutes from "./fornecedor.routes";
import loteRoutes from "./lote.routes";
import movimentacaoRoutes from "./movimentacao.routes";
import tipoMovimentacaoRoutes from "./tipo.movimentacao.routes";
import produtoRoutes from "./produto.routes";
import imagemRoutes from "./imagem.routes";
import categoriaRoutes from "./categoria.routes";
import alertaRoutes from "./alerta.routes";
import itensRoutes from "./itens.pedido.routes";
import pedidoRoutes from "./pedido.routes";


const router = Router();

router.use('/', fornecedorRoutes);
router.use('/', loteRoutes);
router.use('/', clienteRoutes);
router.use('/', enderecoRoutes);
router.use('/', telefoneRoutes);
router.use('/', pessoaRoutes)
router.use('/', movimentacaoRoutes);
router.use('/', tipoMovimentacaoRoutes);
router.use('/', produtoRoutes);
router.use('/', imagemRoutes);
router.use('/', categoriaRoutes);
router.use('/', pedidoRoutes)
router.use('/', alertaRoutes);
router.use('/',itensRoutes);
router.use('/', pedidoRoutes);

export default router;
