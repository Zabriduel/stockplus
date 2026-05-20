export const validarNome = (
    nome: string,
    campo: string = "Nome"
): string => {

    if (!nome || nome.trim().length < 3) {
        throw new Error(
            `${campo} deve ter pelo menos 3 caracteres.`
        );
    }

    if (nome.trim().length > 100) {
        throw new Error(
            `${campo} deve ter no máximo 100 caracteres.`
        );
    }

    return nome.trim();
}