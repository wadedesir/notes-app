export const reverse = (string) => string.split('').reverse().join('')

export const average = (array) => {
  const reducer = (sum, item) => sum + item

  return array.reduce(reducer, 0) / array.length
}
