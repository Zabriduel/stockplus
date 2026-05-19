import { RowDataPacket } from "mysql2";
export interface ITipoMovimentacao extends RowDataPacket {
  idTipoMovimentacao?: number;
  TipoMovimentacao?: string;
}

export class TipoMovimentacao {
  private _idTipoMovimentacao?: number;
  private _tipoMovimentacao!: string;

  constructor(tipoMovimentacao: string, idTipoMovimentacao?: number) {
    this.TipoMovimentacao = tipoMovimentacao;
    this._idTipoMovimentacao = idTipoMovimentacao;
  }

  // GETTERS

  public get IdTipoMovimentacao(): number | undefined {
    return this._idTipoMovimentacao;
  }

  public get TipoMovimentacao(): string {
    return this._tipoMovimentacao;
  }

  // SETTERS

  public set IdTipoMovimentacao(value: number) {
    
    this._idTipoMovimentacao = value;
  }

  public set TipoMovimentacao(value: string) {
    this._validarTipo(value);
    this._tipoMovimentacao = value;
  }

  // FACTORY

  public static criar(
    tipoMovimentacao: string,
  ): TipoMovimentacao {
    return new TipoMovimentacao(tipoMovimentacao);
  }

  public static alterar(
    tipoMovimentacao: string,
    idTipoMovimentacao: number,
  ): TipoMovimentacao {
    return new TipoMovimentacao(tipoMovimentacao, idTipoMovimentacao);
  }

  private _validarTipo(value: string): void {

    if (!isNaN(Number(value))) {
      throw new Error("O nome não pode ser um número!");
    }
    if (value.length < 3) {
      throw new Error("Por favor, envie um nome com mais que 3 caractéres.");
    }
    if (!value) {
      throw new Error("Por favor, envie um nome.");
    }
  }
}
