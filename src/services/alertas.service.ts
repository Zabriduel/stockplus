import { ILote } from "../models/lote.models";
import { LoteRepository } from "../repository/lote.repository";
import { validarDataVencimento } from "../utils/validar.data.validade";
import { validarQtdEstoque } from "../utils/validar.qtd.estoque";

export class AlertaService {
  constructor(private _repository = new LoteRepository()) {}

  async gerarAlertas() {
    const lotes: ILote[] = await this._repository.findAll();
    const listaDeAlertas = [];
    for (let lote of lotes) {
      const qtdValida = lote.qtdLote ?? (lote as any).qtd_lote;
      if (validarQtdEstoque(qtdValida)) {
        listaDeAlertas.push({
          loteId: lote.idLote,
          qtdLote: qtdValida,
          tipo: "Estoque",
          mensagem: `Estoque baixo: ${qtdValida} unidades disponíveis.`,
        });
      }
      const dataValidade = (lote as any).data_vencimento;
      const vencimento = validarDataVencimento(dataValidade);
      if (vencimento) {
        listaDeAlertas.push({
          loteId: lote.idLote,
          qtdLote: qtdValida,
          tipo: "Vencimento",
          mensagem: `Lote próximo ao vencimento: ${vencimento}`,
        });
      }
    }
    return listaDeAlertas;
  }
}
