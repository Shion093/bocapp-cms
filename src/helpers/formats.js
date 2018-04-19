function formatPrice (price) {
  return price.toLocaleString('es-CR', {
    style                 : 'currency',
    currency              : 'crc',
    minimumFractionDigits : 0,
    maximumFractionDigits : 0,
  });
}

export { formatPrice };