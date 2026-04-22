import { TipoMovimentacaoRepository } from "../repository/tipo.movimentacao.repository";
import { TipoMovimentacao } from "../models/tipo.movimentacao.model";

export class TipoMovimentacaoService {
    constructor (private _repository = new TipoMovimentacaoRepository()) {}

    // SELECTS

    async selecionarTodos () {
        return await this._repository.selectAll();
    }

    async selecionarUm (id: number) {
        return await this._repository.select(id);
    }

    // INSERT

    async criar (tipoMov: string) {
        const tipoMovimentacao = TipoMovimentacao.criar(tipoMov);
        return await this._repository.create(tipoMovimentacao);
    }

    // UPDATE

    async editar (id: number, tipoMov: string) {
        const tipoMovimentacao = TipoMovimentacao.alterar(tipoMov, id);
        return await this._repository.update(id, tipoMovimentacao);
    }

    // DELETE
    async deletar (id: number) {
        return await this._repository.delete(id);
    }
}   