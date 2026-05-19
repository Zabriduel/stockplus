export const validarId = (numero: number | undefined): number => {
    if (!numero || isNaN(numero)) {
         throw new Error('Valor para ID inválido.');
    }
    
    return numero;
}