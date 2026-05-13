import { Cliente } from "../models/cliente.model";
import { ClienteRepository } from "../repository/cliente.repository";
import { PessoaRepository } from "../repository/pessoa.repository";

export class ClienteService {

    constructor(
        private _repository = new ClienteRepository(),
        private _pessoaRepository = new PessoaRepository()
    ) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const cliente = await this._repository.findById(id);

        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado.");
        }

        return cliente;
    }

    async criar(
        cpf: string,
        email: string,
        fkIdPessoa: number
    ) {

        if (!cpf || cpf.trim().length !== 11) {
            throw new Error("CPF deve ter 11 caracteres.");
        }

        if (!email || email.trim().length === 0) {
            throw new Error("E-mail é obrigatório.");
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            throw new Error("E-mail inválido.");
        }

        if (!fkIdPessoa || isNaN(fkIdPessoa) || fkIdPessoa <= 0) {
            throw new Error("Pessoa inválida.");
        }

        const pessoa = await this._pessoaRepository.findById(fkIdPessoa);

        if (pessoa.length === 0) {
            throw new Error("Pessoa não encontrada.");
        }

        const cpfExistente = await this._repository.findByCpf(cpf);

        if (cpfExistente.length > 0) {
            throw new Error("CPF já cadastrado.");
        }

        const emailExistente = await this._repository.findByEmail(email);

        if (emailExistente.length > 0) {
            throw new Error("E-mail já cadastrado.");
        }

        const cliente = Cliente.criar(
            cpf,
            email,
            fkIdPessoa
        );

        return await this._repository.create(cliente);
    }

    async editar(
        id: number,
        cpf: string,
        email: string,
        fkIdPessoa: number
    ) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const clienteAtual = await this._repository.findById(id);

        if (clienteAtual.length === 0) {
            throw new Error("Cliente não encontrado.");
        }

        const novoCpf = cpf ?? clienteAtual[0].cpf;
        const novoEmail = email ?? clienteAtual[0].email;
        const novaPessoa = fkIdPessoa ?? clienteAtual[0].idPessoa;

        if (!novoCpf || novoCpf.trim().length !== 11) {
            throw new Error("CPF deve ter 11 caracteres.");
        }

        if (!novoEmail || novoEmail.trim().length === 0) {
            throw new Error("E-mail é obrigatório.");
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(novoEmail)) {
            throw new Error("E-mail inválido.");
        }

        const pessoa = await this._pessoaRepository.findById(novaPessoa);

        if (pessoa.length === 0) {
            throw new Error("Pessoa não encontrada.");
        }

        const cpfExistente = await this._repository.findByCpf(novoCpf);

        if (
            cpfExistente.length > 0 &&
            cpfExistente[0].idCliente !== id
        ) {
            throw new Error("CPF já cadastrado.");
        }

        const emailExistente = await this._repository.findByEmail(novoEmail);

        if (
            emailExistente.length > 0 &&
            emailExistente[0].idCliente !== id
        ) {
            throw new Error("E-mail já cadastrado.");
        }

        const cliente = Cliente.editar(
            novoCpf,
            novoEmail,
            novaPessoa
        );

        return await this._repository.update(id, cliente);
    }

    async deletar(id: number) {

        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const cliente = await this._repository.findById(id);

        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado.");
        }

        return await this._repository.delete(id);
    }
}