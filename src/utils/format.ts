export function formatRupiah(value: number | string | null | undefined): string {
  const num = Number(value ?? 0);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatNumber(value: number | string | null | undefined): string {
  const num = Number(value ?? 0);
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatTanggal(value: string | Date | null | undefined): string {
  if (!value) return '-';
  const d = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}
