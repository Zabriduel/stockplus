import { Router } from "express";
import { MovimentacaoController } from "../controllers/movimentacao.controller";

const movimentacaoController = new MovimentacaoController();
const movimentacaoRoutes = Router();

movimentacaoRoutes.get('/movimentacoes', movimentacaoController.selecionar);
movimentacaoRoutes.post('/movimentacoes', movimentacaoController.inserir);
movimentacaoRoutes.patch('/movimentacoes', movimentacaoController.alterar);
movimentacaoRoutes.delete('/movimentacoes', movimentacaoController.deletar);

export default movimentacaoRoutes;