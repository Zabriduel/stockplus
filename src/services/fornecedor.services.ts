import { FornecedorRepository } from "../repository/fornecedor.repository";
import { Fornecedor } from "../models/fornecedor.models";
import { validarNomeFornecedor } from "../utils/validar.nome.fornecedor";

export class FornecedorService {
    constructor(private _repository = new FornecedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }
    async selecionarPorID(idFornecedor: number) {
        return await this._repository.findById(idFornecedor);
    }

    async criar(nomeFantasia: string, cnpj: string) {
        const nomeValidado = validarNomeFornecedor(nomeFantasia);
        const fornecedor = Fornecedor.criar(nomeValidado, cnpj);

        return await this._repository.create(fornecedor);
    }

    async editar(id: number, nomeFantasia: string, cnpj: string, idPessoa: number) {
        const nomeValidado = validarNomeFornecedor(nomeFantasia);

        const fornecedor = Fornecedor.editar(nomeValidado, cnpj, id, idPessoa);
        return await this._repository.update(id, fornecedor, idPessoa);
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}