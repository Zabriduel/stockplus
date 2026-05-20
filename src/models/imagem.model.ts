import { RowDataPacket } from "mysql2";

export interface IImagem extends RowDataPacket {
    id_imagem?: number;
    vinculo_imagem: string;
}

export class Imagem {

    private _idImagem?: number;
    private _vinculoImagem: string;

    constructor(
        vinculoImagem: string,
        idImagem?: number
    ) {

        this._vinculoImagem = vinculoImagem;

        if (idImagem) {
            this._idImagem = idImagem;
        }
    }

    public get idImagem(): number | undefined {
        return this._idImagem;
    }

    public get vinculoImagem(): string {
        return this._vinculoImagem;
    }

    public static criar(
        vinculoImagem: string
    ): Imagem {

        return new Imagem(vinculoImagem);
    }

    public static editar(
        idImagem: number,
        vinculoImagem: string
    ): Imagem {

        return new Imagem(
            vinculoImagem,
            idImagem
        );
    }
}