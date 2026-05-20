export const validarDataVencimento = (
  dataVencimento: Date,
): "90 dias" | "45 dias" | null => {
  const dataAtual = new Date();
  const diferencaTempo = dataVencimento.getTime() - dataAtual.getTime();
  const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
  if (diferencaDias >= 45 && diferencaDias <= 90) {
    return "90 dias";
  }
  if (diferencaDias > 0 && diferencaDias < 45) {
    return "45 dias";
  }
  return null;
};
