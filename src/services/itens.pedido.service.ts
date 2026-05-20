import { ProdutoRepository } from "../repository/produto.repository";
import { PedidoRepository } from "../repository/pedido.repository";

import { ItemPedido } from "../models/itens.pedido.model";
import { ItemPedidoRepository } from "../repository/itens.pedido.repository";

export class ItemPedidoService {

    constructor(
        private _repository = new ItemPedidoRepository(),
        private _produtoRepository = new ProdutoRepository(),
        private _pedidoRepository = new PedidoRepository()
    ) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const item = await this._repository.findById(id);

        if (item.length === 0) {
            throw new Error("Item do pedido não encontrado.");
        }

        return item;
    }

    async criar(
        fkIdProduto: number,
        fkIdPedido: number,
        quantidade: number
    ) {
        if (!fkIdProduto || isNaN(fkIdProduto) || fkIdProduto <= 0) {
            throw new Error("Produto inválido.");
        }

        if (!fkIdPedido || isNaN(fkIdPedido) || fkIdPedido <= 0) {
            throw new Error("Pedido inválido.");
        }

        if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
            throw new Error("Quantidade inválida.");
        }

        const produto = await this._produtoRepository.findById(fkIdProduto);

        if (produto.length === 0) {
            throw new Error("Produto não encontrado.");
        }

        const pedido = await this._pedidoRepository.findById(fkIdPedido);

        if (pedido.length === 0) {
            throw new Error("Pedido não encontrado.");
        }

        const itemPedido = ItemPedido.criar(
            fkIdProduto,
            fkIdPedido,
            quantidade
        );

        return await this._repository.create(itemPedido);
    }

    async editar(
        id: number,
        fkIdProduto: number,
        fkIdPedido: number,
        quantidade: number
    ) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const itemAtual = await this._repository.findById(id);

        if (itemAtual.length === 0) {
            throw new Error("Item do pedido não encontrado.");
        }

        const novoProduto = fkIdProduto ?? itemAtual[0].id_produto;
        const novoPedido = fkIdPedido ?? itemAtual[0].id_pedido;
        const novaQuantidade = quantidade ?? itemAtual[0].quantidade;

        if (!novoProduto || isNaN(novoProduto) || novoProduto <= 0) {
            throw new Error("Produto inválido.");
        }

        if (!novoPedido || isNaN(novoPedido) || novoPedido <= 0) {
            throw new Error("Pedido inválido.");
        }

        if (!novaQuantidade || isNaN(novaQuantidade) || novaQuantidade <= 0) {
            throw new Error("Quantidade inválida.");
        }

        const produto = await this._produtoRepository.findById(novoProduto);

        if (produto.length === 0) {
            throw new Error("Produto não encontrado.");
        }

        const pedido = await this._pedidoRepository.findById(novoPedido);

        if (pedido.length === 0) {
            throw new Error("Pedido não encontrado.");
        }

        const itemPedido = ItemPedido.editar(
            novoProduto,
            novoPedido,
            novaQuantidade
        );

        return await this._repository.update(id, itemPedido);
    }

    async deletar(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("ID inválido.");
        }

        const item = await this._repository.findById(id);

        if (item.length === 0) {
            throw new Error("Item do pedido não encontrado.");
        }

        return await this._repository.delete(id);
    }
}