import { Pedido } from "../models/pedido.model";
import { PedidoRepository } from "../repository/pedido.repository";
import { ClienteRepository } from "../repository/cliente.repository";
import { validarId } from "../utils/validar.id";

export class PedidoService {

    constructor(private _repository = new PedidoRepository(), private _clienteRepository = new ClienteRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        validarId(id);
        return await this._repository.findById(id);
    }

    async selecionarPorCliente(idCliente: number) {
        validarId(idCliente);
        return await this._repository.findByCliente(idCliente);
    }

    async criar(idCliente: number, valorTotal: number, qtdItens: number) {
        validarId(idCliente);
        const cliente = await this._clienteRepository.findById(idCliente);
        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado.");
        }
        const pedido = Pedido.criar(idCliente, valorTotal, qtdItens);
        return await this._repository.create(pedido);
    }

    async editar(id: number, idCliente: number, valorTotal: number, qtdItens: number) {
        validarId(id);
        const pedidoAtual = await this._repository.findById(id);
        if (pedidoAtual.length === 0) {
            throw new Error("Pedido não encontrado.");
        }
        const novoCliente = idCliente ?? pedidoAtual[0].fk_id_cliente;
        const novoValorTotal = valorTotal ?? pedidoAtual[0].valor_total;
        const novaQtdItens = qtdItens ?? pedidoAtual[0].qtd_itens;
        const cliente = await this._clienteRepository.findById(novoCliente);
        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado.");
        }
        const pedido = Pedido.editar(id, novoCliente, novoValorTotal, novaQtdItens);
        return await this._repository.update(id, pedido);
    }

    async deletar(id: number) {
        validarId(id);
        const pedido = await this._repository.findById(id);
        if (pedido.length === 0) {
            throw new Error("Pedido não encontrado.");
        }
        return await this._repository.delete(id);
    }
}