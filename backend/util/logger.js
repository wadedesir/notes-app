import chalk from 'chalk'

export const logInfo = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    chalk.green(console.log(...params))
  }
}

export const logError = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    chalk.red(console.error(...params))
  }
}
