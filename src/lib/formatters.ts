/**
 * Formats positive integer INR amounts with Indian numbering system grouping.
 * Example: 54900 -> ₹54,900
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount < 0) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Formats range of INR amounts.
 */
export function formatINRRange(min: number, max: number): string {
  return `${formatINR(min)} – ${formatINR(max)}`;
}

/**
 * Formats dimensions in centimeters.
 */
export function formatDimensions(w: number, d: number, h: number): string {
  return `${w} × ${d} × ${h} cm`;
}
