import { ImagemProduto } from "../models/imagem.produto.model";
import { ImagemProdutoRepository } from "../repository/imagem.produto.repository";

export class ImagemProdutoService {

    constructor(
        private _repository = new ImagemProdutoRepository()
    ) { }

    async criar(
        idImagem: number,
        idProduto: number
    ) {

        const imagemProduto = ImagemProduto.criar(
            idImagem,
            idProduto
        );

        return await this._repository.create(
            imagemProduto
        );
    }

    async selecionarPorProduto(idProduto: number) {
        return await this._repository.findByProduto(idProduto);
    }

    async deletar(idImagem: number) {
        return await this._repository.delete(idImagem);
    }
}