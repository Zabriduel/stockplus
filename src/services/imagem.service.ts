import { Imagem } from "../models/imagem.model";
import { ImagemRepository } from "../repository/imagem.repository";

export class ImagemService {

    constructor(
        private _repository = new ImagemRepository()
    ) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }

    async criar(vinculoImagem: string) {

        const imagem = Imagem.criar(vinculoImagem);

        return await this._repository.create(imagem);
    }

    async editar(
        id: number,
        vinculoImagem: string
    ) {

        const imagem = Imagem.editar(
            id,
            vinculoImagem
        );

        return await this._repository.update(
            id,
            imagem
        );
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}