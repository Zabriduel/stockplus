import { Produto } from "../models/produto.model";
import { ProdutoRepository } from "../repository/produto.repository";
import { ImagemService } from "./imagem.service";
import { ImagemProdutoService } from "./imagem.produto.service";

export class ProdutoService {

    constructor(
        private _repository = new ProdutoRepository(),
        private _imagemService = new ImagemService(),
        private _imagemProdutoService = new ImagemProdutoService()
    ) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }

    async criar(
        nome: string,
        valor: number,
        idCategoria: number,
        vinculoImagem: string
    ) {
        const produto = Produto.criar(
            nome,
            valor,
            idCategoria
        );

        const produtoCriado =
            await this._repository.create(produto, vinculoImagem);

        const imagemCriada =
            await this._imagemService.criar(vinculoImagem);

        await this._imagemProdutoService.criar(
            imagemCriada.insertId,
            produtoCriado.insertId
        );

        return {
            idProduto: produtoCriado.insertId,
            idImagem: imagemCriada.insertId
        };
    }

    async editar(
        id: number,
        nome: string,
        valor: number,
        idCategoria: number
    ) {
        const produto = Produto.editar(
            id,
            nome,
            valor,
            idCategoria
        );

        return await this._repository.update(id, produto);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}