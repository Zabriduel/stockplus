export const validarValor = (
    valor: number
): number => {

    if (valor === undefined || valor === null) {
        throw new Error("Valor é obrigatório.");
    }

    if (isNaN(valor)) {
        throw new Error("Valor inválido.");
    }

    if (valor <= 0) {
        throw new Error(
            "Valor deve ser maior que zero."
        );
    }

    return valor;
}