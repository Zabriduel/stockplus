export const validarQtdEstoque = (estoque: number): boolean => {
  const estoqueMin = 20;

  if (estoque <= estoqueMin) {
    return true;
  }

  return false;
};
