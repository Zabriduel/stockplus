import { Categoria } from "../models/categoria.model";
import { CategoriaRepository } from "../repository/categoria.repository";

export class CategoriaService {

    constructor(private _repository = new CategoriaRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }

    async selecionarPorNome(nome: string) {
        return await this._repository.findByName(nome);
    }

    async criar(nomeCategoria: string) {
        const categoria = Categoria.criar(nomeCategoria);
        return await this._repository.create(categoria);
    }

    async editar(id: number, nomeCategoria: string) {
        const categoria = Categoria.editar(id, nomeCategoria);
        return await this._repository.update(id, categoria);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}