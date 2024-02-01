import chalk from 'chalk'

export const logInfo = (...params) => {
  chalk.green(console.log(...params))
}

export const logError = (...params) => {
  chalk.red(console.error(...params))
}
