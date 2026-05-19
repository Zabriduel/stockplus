import { FornecedorRepository } from "../repository/fornecedor.repository";
import { Fornecedor } from "../models/fornecedor.models";

export class FornecedorService {
    constructor(private _repository = new FornecedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }
    async selecionarPorID(idFornecedor: number) {
        return await this._repository.findById(idFornecedor);
    }

    async criar(nomeFantasia: string, cnpj: string) {
        const fornecedor = Fornecedor.criar(nomeFantasia, cnpj);

        return await this._repository.create(fornecedor);
    }

    async editar(id: number, nomeFantasia: string, cnpj: string, idPessoa: number) {
        const fornecedor = Fornecedor.editar(nomeFantasia, cnpj, id, idPessoa);
        return await this._repository.update(id, fornecedor, idPessoa);
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}