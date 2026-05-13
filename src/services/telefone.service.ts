import { Telefone } from "../models/telefone.model";
import { PessoaRepository } from "../repository/pessoa.repository";
import { TelefoneRepository } from "../repository/telefone.repository";

export class TelefoneService {

    constructor(
        private _repository = new TelefoneRepository(),
        private _pessoaRepository = new PessoaRepository()
    ) {}

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

    async criar(
        telefone: string,
        fk_id_pessoa: number
    ) {

        if (!telefone) {
            throw new Error("Telefone é obrigatório.");
        }

        telefone = telefone.replace(/\D/g, "");

        if (telefone.length < 10 || telefone.length > 11) {
            throw new Error(
                "Telefone inválido."
            );
        }

        if (
            !fk_id_pessoa ||
            isNaN(fk_id_pessoa) ||
            fk_id_pessoa <= 0
        ) {
            throw new Error(
                "Pessoa inválida."
            );
        }

        const pessoa =
            await this._pessoaRepository.findById(
                fk_id_pessoa
            );

        if (pessoa.length === 0) {
            throw new Error(
                "Pessoa não encontrada."
            );
        }

        const telefoneExistente =
            await this._repository.findByTelefone(
                telefone
            );

        if (telefoneExistente.length > 0) {
            throw new Error(
                "Telefone já cadastrado."
            );
        }

        const novoTelefone =
            Telefone.criar(
                telefone,
                fk_id_pessoa
            );

        return await this._repository.create(
            novoTelefone
        );
    }

    async editar(
        id: number,
        telefone: string,
        fk_id_pessoa: number
    ) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const atual =
            await this._repository.findById(id);

        if (atual.length === 0) {
            throw new Error(
                "Telefone não encontrado."
            );
        }

        const novoTelefone = (
            telefone ??
            atual[0].telefone
        ).replace(/\D/g, "");

        const novaPessoa =
            fk_id_pessoa ??
            atual[0].id_pessoa;

        if (
            novoTelefone.length < 10 ||
            novoTelefone.length > 11
        ) {
            throw new Error(
                "Telefone inválido."
            );
        }

        const pessoa =
            await this._pessoaRepository.findById(
                novaPessoa
            );

        if (pessoa.length === 0) {
            throw new Error(
                "Pessoa não encontrada."
            );
        }

        const telefoneExistente =
            await this._repository.findByTelefone(
                novoTelefone
            );

        if (
            telefoneExistente.length > 0 &&
            telefoneExistente[0].id_telefone !== id
        ) {
            throw new Error(
                "Telefone já cadastrado."
            );
        }

        const telefoneEditado =
            Telefone.editar(
                novoTelefone,
                novaPessoa
            );

        return await this._repository.update(
            id,
            telefoneEditado
        );
    }

    async deletar(id: number) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const telefone =
            await this._repository.findById(id);

        if (telefone.length === 0) {
            throw new Error(
                "Telefone não encontrado."
            );
        }

        return await this._repository.delete(id);
    }
}