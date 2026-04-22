import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarUm(id: number) {
        console.log(id)
        return await this._repository.findOne(id);
    }

    async selecionarNome(nome: string) {
        console.log(nome)
        return await this._repository.selectName(nome);
    }


    async inserir(nome: string, valor: number, vinculoImagem: string, idCategoria: number) {
        console.log(`INSERT PRODUTO SERVICE: ${nome}, ${valor}, ${vinculoImagem}, ${idCategoria}`)
        const produto = Produto.inserir(nome, valor, vinculoImagem, idCategoria);
        return await this._repository.inserir(produto);
    }

    async alterar(id: number, nome: string, valor: number, vinculoImagem: string, idCategoria: number) {
        const produto = Produto.alterar(nome, valor, vinculoImagem, idCategoria, id);
        console.log(`ALTERAR PRODUTO SERVICE: ${nome}, ${valor}, ${vinculoImagem}, ${idCategoria}`)
        return await this._repository.update(id, produto);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }

}
