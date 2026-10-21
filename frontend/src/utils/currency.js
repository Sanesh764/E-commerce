/**
 * Formats a numeric rupee value into Indian Rupee (INR) currency format.
 * Example: 1499 -> "₹1,499"
 *
 * @param {number} amount - Amount in rupees
 * @returns {string} Formatted INR string
 */
export function formatPrice(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0'
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Converts integer paise (used in backend and Razorpay) to rupees string.
 * Example: 149900 -> "₹1,499"
 *
 * @param {number} paise - Amount in paise
 * @returns {string} Formatted INR string
 */
export function formatPaise(paise) {
  if (typeof paise !== 'number' || isNaN(paise)) {
    return '₹0'
  }
  return formatPrice(paise / 100)
}
