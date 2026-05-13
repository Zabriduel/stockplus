// pessoa.service.ts

import { Pessoa } from "../models/pessoa.model";
import { PessoaRepository } from "../repository/pessoa.repository";

export class PessoaService {
    constructor(private _repository = new PessoaRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const pessoa = await this._repository.findById(id);

        if (pessoa.length === 0) {
            throw new Error("Pessoa não encontrada.");
        }

        return pessoa;
    }

    async criar(nome: string) {
        if (!nome || nome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }

        if (nome.trim().length > 100) {
            throw new Error("Nome deve ter no máximo 100 caracteres.");
        }

        const pessoa = Pessoa.criar(nome);

        return await this._repository.create(pessoa);
    }

    async editar(id: number, nome: string) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const pessoaAtual = await this._repository.findById(id);

        if (pessoaAtual.length === 0) {
            throw new Error("Pessoa não encontrada.");
        }

        const novoNome = nome ?? pessoaAtual[0].nome;

        if (!novoNome || novoNome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }

        if (novoNome.trim().length > 100) {
            throw new Error("Nome deve ter no máximo 100 caracteres.");
        }

        const pessoa = Pessoa.editar(novoNome);

        return await this._repository.update(id, pessoa);
    }

    async deletar(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const pessoa = await this._repository.findById(id);

        if (pessoa.length === 0) {
            throw new Error("Pessoa não encontrada.");
        }

        return await this._repository.delete(id);
    }
}