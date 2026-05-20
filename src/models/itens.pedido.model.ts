export class ItemPedido {

    private _id?: number;
    private _fk_id_produto: number;
    private _fk_id_pedido: number;
    private _quantidade: number;

    constructor(
        fk_id_produto: number,
        fk_id_pedido: number,
        quantidade: number,
        id?: number
    ) {
        this._fk_id_produto = fk_id_produto;
        this._fk_id_pedido = fk_id_pedido;
        this._quantidade = quantidade;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get FKIdProduto(): number {
        return this._fk_id_produto;
    }

    public get FKIdPedido(): number {
        return this._fk_id_pedido;
    }

    public get Quantidade(): number {
        return this._quantidade;
    }

    public static criar(fk_id_produto: number, fk_id_pedido: number, quantidade: number
    ): ItemPedido {
        return new ItemPedido(fk_id_produto, fk_id_pedido, quantidade
        );
    }

    public static editar(fk_id_produto: number, fk_id_pedido: number, quantidade: number
    ): ItemPedido {
        return new ItemPedido(fk_id_produto, fk_id_pedido, quantidade
        );
    }
}