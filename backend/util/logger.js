import chalk from 'chalk'

/**
 * Logs information to the console in green color, except in the 'test' environment.
 * @param {...any} params - Information to be logged.
 */
export const logInfo = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    chalk.green(console.log(...params))
  }
}

/**
 * Logs error messages to the console in red color.
 * @param {...any} params - Error messages to be logged.
 */
export const logError = (...params) => {
  chalk.red(console.error(...params))
}
