/**
 * Shared utilities and helpers.
 * Add product helpers, formatters, etc. here.
 */

export function formatPrice(amount: number, currency = "en-IN"): string {
  return new Intl.NumberFormat(currency, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
