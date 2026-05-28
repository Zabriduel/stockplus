export const validarCPF = (cpf: string): string => {
    const regex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    if (!regex.test(cpf)) {
        throw new Error('CPF informado é inválido!');
    }
    return cpf.replace(/\D/g, '');
}

export const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        throw new Error("O email informado é inválido!");
    }
    return email
}

export const validarNome = (nome: string) => {
    if (!nome || nome.trim().length < 3) {
        throw new Error('Nome deve ter pelo menos 3 caracteres');
    }
    if (nome.length > 100) {
        throw new Error('Perfil deve ter no máximo 100 caracteres');
    }
    if (!isNaN(Number(nome))) {
        throw new Error('Nome deve ser um texto');
    }
    return nome;
}

export const validarAtivo = (
    is_active: number | undefined | null
): number => {

    const ativoNumero = Number(is_active);

    if (ativoNumero !== 0 && ativoNumero !== 1) {
        throw new Error("Status inválido!");
    }

    return ativoNumero;
}

export function validarSenha(senha: string): string {
    if (!senha) {
        throw new Error("Senha obrigatória");
    }

    if (senha.length < 6) {
        throw new Error("Senha deve conter ao menos 6 caracteres");
    }
    return senha;
}

export const validarPessoa = (
    pessoa: number | undefined | null
): number => {

    const pessoaNumero = Number(pessoa);

    if (!pessoaNumero || pessoaNumero <= 0) {
        throw new Error("Pessoa inválida!");
    }

    return pessoaNumero;
}