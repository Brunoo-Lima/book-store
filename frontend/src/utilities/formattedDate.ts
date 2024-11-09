export const formatDateTimeToBr = (isoDate: string, noHour = false) => {
  return new Date(isoDate).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(noHour && { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
  });
};
