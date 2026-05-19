import { Lote } from "../models/lote.models";
import { LoteRepository } from "../repository/lote.repository";

export class LoteService {
    constructor(private _repository = new LoteRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }
    async selecionarPorID(idLote: number) {
        return await this._repository.findById(idLote);
    }

    async criar(fkIdProduto: number, fkIdFornecedor: number, lote: string, qtnLote: number, dataVencimento: Date) {
        const loteCriar = Lote.criar(fkIdProduto, fkIdFornecedor, lote, qtnLote, dataVencimento);

        return await this._repository.create(loteCriar);
    }

    async editar(fkIdProduto: number, fkIdFornecedor: number, lote: string, qtnLote: number, dataVencimento: Date, idLote: number) {
        const loteEditar = Lote.editar(fkIdProduto, fkIdFornecedor, lote, qtnLote, dataVencimento, idLote);
        return await this._repository.update(idLote, loteEditar);
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}