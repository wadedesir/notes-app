import mongoose from 'mongoose'
import { MONGODB_URI, DB_NAME } from '../util/config.js'
import { logInfo, logError } from '../util/logger.js'

/**
 * Logs a message when Mongoose is successfully connected to the database.
 */
mongoose.connection.on('connected', () => {
  logInfo('Mongoose connected to db...')
})

/**
 * Logs an error message when there's an error with the Mongoose connection.
 * @param {Error} err - The error object.
 */
mongoose.connection.on('error', err => {
  logInfo(err.message)
})

/**
 * Logs a message when Mongoose connection is disconnected.
 */
mongoose.connection.on('disconnected', () => {
  logInfo('Mongoose connection is disconnected...')
})

/**
 * Initializes the MongoDB database connection using Mongoose.
 * Logs the connection information and sets up event listeners.
 */
export const initDb = () => {
  logInfo(`connecting to mongodb - db_uri:${MONGODB_URI} | db_name:${DB_NAME}`)

  mongoose.set('strictQuery', false)
  try {
    mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (e) {
    logError(e)
  }
}
