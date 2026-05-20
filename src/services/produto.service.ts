import { Produto } from "../models/produto.model";
import { ProdutoRepository } from "../repository/produto.repository";

export class ProdutoService {

    constructor(private _repository = new ProdutoRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }

    async criar(nome: string, valor: number, idCategoria: number) {
        const produto = Produto.criar(nome, valor, idCategoria);
        return await this._repository.create(produto);
    }

    async editar(id: number, nome: string, valor: number, idCategoria: number) {
        const produto = Produto.editar(id, nome, valor, idCategoria);
        return await this._repository.update(id, produto);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}