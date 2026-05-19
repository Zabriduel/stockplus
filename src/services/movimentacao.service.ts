import { MovimentacaoRepository } from "../repository/movimentacao.repository";
import { Movimentacao } from "../models/movimentacao.model";

export class MovimentacaoService {
    constructor (private _repository = new MovimentacaoRepository()) {}

    // SELECTS

    async selecionarTodos () {
        return await this._repository.selectAll();
    }

    async selecionarUm (id: number) {
        return await this._repository.select(id);
    }

    async selecionarPorLote (idLote: number) {
        return await this._repository.selectLote(idLote);
    }

    // INSERT

    async criar (idLote: number, idTipoMov: number, qntMovimentada: number, dataMovimentacao: Date) {
        const movimentacao = Movimentacao.criar(idLote, idTipoMov, qntMovimentada, dataMovimentacao);
        return await this._repository.create(movimentacao);
    }

    // UPDATE
    async editar (id: number, idLote: number, idTipoMov: number, qntMovimentada: number, dataMovimentacao: Date) {
        const movimentacao = Movimentacao.alterar(idLote, idTipoMov, qntMovimentada, dataMovimentacao, id);
        return await this._repository.update(id, movimentacao);
    }
    // DELETE

    async deletar (id: number) {
        return await this._repository.delete(id);
    }
}   