/**
 * Format a number to a 3-digit string, padding with zeros if necessary.
 *
 * Example: 4 -> "004"
 *
 * @param {number} num The number to format
 * @returns {string} The formatted string
 */
export function formatDigits(input: number | string): string {
  const num = Number(input)

  // Check if the parsed input is a valid number
  if (isNaN(num)) {
    throw new Error('Input must be a valid number or a string representing a number.')
  }

  return num.toString().padStart(3, '0')
}
