import { RowDataPacket } from "mysql2";
export interface IMovimentacao extends RowDataPacket {
  idMovimentacao?: number;
  fkIdLote?: number;
  fkIdTipoMov?: number;
  qntMovimentada?: number;
  dataMovimentacao?: Date;
}

export class Movimentacao {
  private _idMovimentacao?: number;
  private _fkIdLote!: number;
  private _fkIdTipoMov!: number;
  private _qntMovimentada!: number;
  private _dataMovimentacao?: Date;

  constructor(
    fkIdLote: number,
    fkIdTipoMov: number,
    qntMovimentada: number,
    dataMovimentacao: Date,
    idMovimentacao?: number,
  ) {
    this.IdLote = fkIdLote;
    this.IdTipoMov = fkIdTipoMov;
    this.QntMovimentada = qntMovimentada;
    this.DataMovimentacao = dataMovimentacao;
    this._idMovimentacao = idMovimentacao;
  }

  // GETTERS

  public get IdMovimentacao(): number | undefined {
    return this._idMovimentacao;
  }

  public get IdLote(): number | undefined {
    return this._fkIdLote;
  }

  public get IdTipoMov(): number | undefined {
    return this._fkIdTipoMov;
  }

  public get QntMovimentada(): number | undefined {
    return this._qntMovimentada;
  }

  public get DataMovimentacao(): Date | undefined {
    return this._dataMovimentacao;
  }

  // SETTERS

  public set IdMovimentacao(value: number) {
    this._idMovimentacao = value;
  }

  public set IdLote(value: number) {
    this._fkIdLote = value;
  }

  public set IdTipoMov(value: number) {
    this._fkIdTipoMov = value;
  }

  public set QntMovimentada(value: number) {
    this._validarQnt(value);
    this._qntMovimentada = value;
  }

  public set DataMovimentacao(value: Date) {
    this._validarData(value);
    this._dataMovimentacao = value;
  }

  // FACTORY

  public static criar(
    fkIdLote: number,
    fkIdTipoMov: number,
    qntMovimentada: number,
    dataMovimentacao: Date,
  ): Movimentacao {
    return new Movimentacao(
      fkIdLote,
      fkIdTipoMov,
      qntMovimentada,
      dataMovimentacao,
    );
  }

  public static alterar(
    fkIdLote: number,
    fkIdTipoMov: number,
    qntMovimentada: number,
    dataMovimentacao: Date,
    idMovimentacao: number,
  ) {
    return new Movimentacao(
      fkIdLote,
      fkIdTipoMov,
      qntMovimentada,
      dataMovimentacao,
      idMovimentacao,
    );
  }

  private _validarQnt(value: number): void {
    if (value < 1) {
      throw new Error("A quantidade deve ser um número positivo!");
    }

    if (isNaN(value)) {
      throw new Error("A quantidade deve ser um número!");
    }

    if (!value) {
      throw new Error("Por favor, envie uma quantidade.");
    }
  }

  private _validarData(value: Date): void {
    if (!value) {
      throw new Error("Por favor, envie uma data de movimentação válida.");
    }

    const data = new Date(value);
    if (isNaN(data.getTime())) {
      throw new Error(
        "A data de movimentação informada é inválida! Por favor, envie a data no formato YYYY-MM-DD",
      );
    }
  }
}
