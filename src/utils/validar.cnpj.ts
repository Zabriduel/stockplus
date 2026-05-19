export const validarCnpj = (cnpj: string): string => {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    if (!cnpj || !regex.test(cnpj)) {
        throw new Error('Cnpj inválido')
    }

    const cnpjSemPontos = cnpj.replace(/\D/g, "");
    
    return cnpjSemPontos;
}

