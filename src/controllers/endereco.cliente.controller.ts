import { Request, Response } from "express";
import { EnderecoClienteService } from "../services/endereco.cliente.service";

export class EnderecoClienteController {
    constructor(private _service = new EnderecoClienteService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        const dados = await this._service.selecionarTodos();
        return res.json(dados);
    };

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const dados = await this._service.selecionarPorId(id);
            return res.json(dados);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    };

    selecionarPorCliente = async (req: Request, res: Response) => {
        const idCliente = Number(req.params.id);
        const dados = await this._service.selecionarPorCliente(idCliente);
        return res.json(dados);
    };

    criar = async (req: Request, res: Response) => {
        try {
            const idCliente = Number(req.params.id);
            const { cep, numero, complemento } = req.body;

            const resultado = await this._service.criar(
                idCliente,
                cep,
                numero,
                complemento
            );

            return res.status(201).json(resultado);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    };

    editar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { fk_id_cliente, logradouro, numero, bairro, cidade, cep, uf, complemento } = req.body;

            const resultado = await this._service.editar(
                id,
                fk_id_cliente,
                logradouro,
                numero,
                bairro,
                cidade,
                cep,
                uf,
                complemento
            );

            return res.json(resultado);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    };

    deletar = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const resultado = await this._service.deletar(id);
        return res.json(resultado);
    };
}