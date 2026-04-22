import { Cliente } from "../models/cliente.model";
import { ClienteRepository } from "../repository/cliente.repository";

export class ClienteService {
    constructor(private _repository = new ClienteRepository()) {}

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

    async selecionarPorIdPadrao(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        return await this._repository.findByIdDefault(id);
    }

    async selecionarPorNome(nome: string) {
        if (!nome || nome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }

        if (nome.trim().length > 100) {
            throw new Error("Nome deve ter no máximo 100 caracteres.");
        }

        const cliente = await this._repository.findByName(nome);

        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado.");
        }

        return cliente;
    }

    async criar(nome: string, email: string, cpf: string) {
        if (!nome || nome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }

        if (nome.trim().length > 100) {
            throw new Error("Nome deve ter no máximo 100 caracteres.");
        }

        if (!email || email.trim().length === 0) {
            throw new Error("E-mail é obrigatório.");
        }

        if (email.trim().length > 100) {
            throw new Error("E-mail deve ter no máximo 100 caracteres.");
        }

        if (!cpf || cpf.trim().length !== 11) {
            throw new Error("CPF deve ter 11 caracteres.");
        }

        const cpfExistente = await this._repository.findByCpf(cpf);
        if (cpfExistente.length > 0) {
            throw new Error("CPF já cadastrado.");
        }

        const emailExistente = await this._repository.findByEmail(email);
        if (emailExistente.length > 0) {
            throw new Error("E-mail já cadastrado.");
        }

        const cliente = Cliente.criar(nome, email, cpf);
        return await this._repository.create(cliente);
    }

    async editar(id: number, nome: string, email: string, cpf: string) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const clienteAtual = await this._repository.findByIdDefault(id);

        if (clienteAtual.length === 0) {
            throw new Error("Cliente não encontrado.");
        }

        const novoNome = nome ?? clienteAtual[0].nome_cliente;
        const novoEmail = email ?? clienteAtual[0].email;
        const novoCpf = cpf ?? clienteAtual[0].cpf;

        if (!novoNome || novoNome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }

        if (novoNome.trim().length > 100) {
            throw new Error("Nome deve ter no máximo 100 caracteres.");
        }

        if (!novoEmail || novoEmail.trim().length === 0) {
            throw new Error("E-mail é obrigatório.");
        }

        if (novoEmail.trim().length > 100) {
            throw new Error("E-mail deve ter no máximo 100 caracteres.");
        }

        if (!novoCpf || novoCpf.trim().length !== 11) {
            throw new Error("CPF deve ter 11 caracteres.");
        }

        const cpfExistente = await this._repository.findByCpf(novoCpf);
        if (cpfExistente.length > 0 && cpfExistente[0].id_cliente !== id) {
            throw new Error("CPF já cadastrado.");
        }

        const emailExistente = await this._repository.findByEmail(novoEmail);
        if (emailExistente.length > 0 && emailExistente[0].id_cliente !== id) {
            throw new Error("E-mail já cadastrado.");
        }

        const cliente = Cliente.editar(novoNome, novoEmail, novoCpf);
        return await this._repository.update(id, cliente);
    }

    async deletar(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const cliente = await this._repository.findByIdDefault(id);

        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado.");
        }

        return await this._repository.delete(id);
    }
}