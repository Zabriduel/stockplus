import { Telefone } from "../models/telefone.model";
import { TelefoneRepository } from "../repository/telefone.repository";

export class TelefoneService {

    constructor(private _repository = new TelefoneRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const telefone = await this._repository.findById(id);

        if (telefone.length === 0) {
            throw new Error("Telefone não encontrado.");
        }

        return telefone;
    }

    async criar(telefone: string) {

        if (!telefone || telefone.trim().length < 10 || telefone.trim().length > 11) {
            throw new Error("Telefone deve ter entre 10 e 11 caracteres.");
        }

        const telefoneExistente = await this._repository.findByTelefone(telefone);

        if (telefoneExistente.length > 0) {
            throw new Error("Telefone já cadastrado.");
        }

        const novoTelefone = Telefone.criar(telefone);

        return await this._repository.create(novoTelefone);
    }

    async editar(id: number, telefone: string) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const telefoneAtual = await this._repository.findById(id);

        if (telefoneAtual.length === 0) {
            throw new Error("Telefone não encontrado.");
        }

        const novoTelefone = telefone ?? telefoneAtual[0].telefone;

        if (!novoTelefone || novoTelefone.trim().length < 10 || novoTelefone.trim().length > 11) {
            throw new Error("Telefone deve ter entre 10 e 11 caracteres.");
        }

        const telefoneExistente = await this._repository.findByTelefone(novoTelefone);

        if (
            telefoneExistente.length > 0 &&
            telefoneExistente[0].id_telefone !== id
        ) {
            throw new Error("Telefone já cadastrado.");
        }

        const telefoneEditado = Telefone.editar(novoTelefone);

        return await this._repository.update(id, telefoneEditado);
    }

    async deletar(id: number) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const telefone = await this._repository.findById(id);

        if (telefone.length === 0) {
            throw new Error("Telefone não encontrado.");
        }

        return await this._repository.delete(id);
    }
}