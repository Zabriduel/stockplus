import { Lote } from "../models/lote.models";
import { RelatorioRepository } from "../repository/relatorio.repository";

export class RelatorioService {
    constructor(private _repository = new RelatorioRepository()) { }

  async selecionarRelatorios() {
     return await this._repository.findAll();
  }
}