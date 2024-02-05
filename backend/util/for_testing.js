/**
 * Reverses the characters in a string.
 * @param {string} string - The input string to be reversed.
 * @returns {string} The reversed string.
 */
export const reverse = (string) => string.split('').reverse().join('')

/**
 * Calculates the average of numbers in an array.
 * @param {number[]} array - The array of numbers to calculate the average.
 * @returns {number} The average of the numbers in the array.
 */
export const average = (array) => {
  const reducer = (sum, item) => sum + item

  return array.reduce(reducer, 0) / array.length
}
