import { EnderecoCliente } from "../models/endereco.cliente.model";
import { EnderecoClienteRepository } from "../repository/endereco.cliente.repository";

interface ViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

export class EnderecoClienteService {
    constructor(private _repository = new EnderecoClienteRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        if (!id || isNaN(id)) {
            throw new Error("ID inválido.");
        }

        const endereco = await this._repository.findById(id);

        if (endereco.length === 0) {
            throw new Error("Endereço não encontrado.");
        }

        return endereco;
    }

    async selecionarPorCliente(fk_id_cliente: number) {
        if (!fk_id_cliente || isNaN(fk_id_cliente)) {
            throw new Error("ID do cliente inválido.");
        }

        return await this._repository.findByCliente(fk_id_cliente);
    }

    async selecionarPorIdPadrao(id: number) {
        if (!id || isNaN(id)) {
            throw new Error("ID inválido.");
        }

        return await this._repository.findByIdDefault(id);
    }

    async criar(
        fk_id_cliente: number,
        cep: string,
        numero: string,
        complemento?: string
    ) {
        if (!fk_id_cliente || isNaN(fk_id_cliente)) {
            throw new Error("Cliente inválido.");
        }

        if (!cep) {
            throw new Error("CEP é obrigatório.");
        }

        cep = cep.replace("-", "").trim();

        if (cep.length !== 8) {
            throw new Error("CEP deve ter 8 caracteres.");
        }

        if (!numero || numero.trim().length === 0) {
            throw new Error("Número é obrigatório.");
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.ok) {
            throw new Error("Erro ao consultar o CEP.");
        }

        const data = await response.json() as ViaCepResponse;

        if (data.erro) {
            throw new Error("CEP não encontrado.");
        }

        const endereco = EnderecoCliente.criar(
            fk_id_cliente,
            data.logradouro,
            numero,
            data.bairro,
            data.localidade,
            cep,
            data.uf,
            complemento
        );

        return await this._repository.create(endereco);
    }

    async editar(
        id: number,
        fk_id_cliente: number,
        cep: string,
        numero: string,
        complemento?: string
    ) {

        if (!id || isNaN(id)) {
            throw new Error("ID inválido.");
        }

        const atual = await this._repository.findByIdDefault(id);

        if (atual.length === 0) {
            throw new Error("Endereço não encontrado.");
        }

        const novoCep = (cep ?? atual[0].cep).replace("-", "").trim();

        if (novoCep.length !== 8) {
            throw new Error("CEP deve ter 8 caracteres.");
        }

        const novoNumero = numero ?? atual[0].numero;

        const novoComplemento =
            complemento ?? atual[0].complemento;

        const response = await fetch(
            `https://viacep.com.br/ws/${novoCep}/json/`
        );

        if (!response.ok) {
            throw new Error("Erro ao consultar o CEP.");
        }

        const data = await response.json() as ViaCepResponse;

        if (data.erro) {
            throw new Error("CEP não encontrado.");
        }

        const endereco = EnderecoCliente.editar(
            fk_id_cliente ?? atual[0].fk_id_cliente,
            data.logradouro,
            novoNumero,
            data.bairro,
            data.localidade,
            novoCep,
            data.uf,
            novoComplemento
        );

        return await this._repository.update(id, endereco);
    }

    async deletar(id: number) {
        if (!id || isNaN(id)) {
            throw new Error("ID inválido.");
        }

        return await this._repository.delete(id);
    }
}