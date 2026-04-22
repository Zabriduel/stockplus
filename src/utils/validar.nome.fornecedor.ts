import { error } from "node:console";

export const validarNomeFornecedor = (nome: string): string => {
    if (!nome || nome.trim().length < 3) {
        throw new Error('Nome deve ter 3 caracteres ou mais');
    }
    if (!isNaN(Number(nome))) {
        throw new Error('Nome não pode ser um número');
    }
    if (nome.trim().length > 100) {
        throw new Error('Nome deve ter no máximo 100 caracteres');
    }

    return nome;
}


export const validarCnpj = (cnpj: string): string => {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    if (!cnpj || !regex.test(cnpj)) {
        throw new Error('Cnpj inválido')
    }

    const cnpjSemPontos = cnpj.replace(/\D/g, "");
    console.log(cnpjSemPontos);

    return cnpjSemPontos;
}

