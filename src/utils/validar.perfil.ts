export const validarPerfil = (
    perfil: number | undefined | null
): number => {

    const perfilNumero = Number(perfil);

    if (!perfilNumero || perfilNumero <= 0) {
        throw new Error("Perfil inválido!");
    }

    return perfilNumero;
}