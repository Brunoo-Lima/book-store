export function FormatCurrency(currency: string, value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: currency,
  });
}
