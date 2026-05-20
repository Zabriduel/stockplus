import { Router } from "express";
import { TipoMovimentacaoController } from "../controllers/tipo.movimentacao.controller";

const tipoMovimentacaoController = new TipoMovimentacaoController();
const tipoMovimentacaoRoutes = Router();

tipoMovimentacaoRoutes.get('/tiposMovimentacoes', tipoMovimentacaoController.selecionar);
tipoMovimentacaoRoutes.post('/tiposMovimentacoes', tipoMovimentacaoController.inserir);
tipoMovimentacaoRoutes.patch('/tiposMovimentacoes', tipoMovimentacaoController.alterar);
tipoMovimentacaoRoutes.delete('/tiposMovimentacoes', tipoMovimentacaoController.deletar);

export default tipoMovimentacaoRoutes;