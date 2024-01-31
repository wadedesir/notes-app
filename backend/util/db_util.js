import mongoose from 'mongoose'
import { MONGODB_URI, DB_NAME } from '../util/config.js'
import { logInfo, logError } from '../util/logger.js'

mongoose.connection.on('connected', () => {
  logInfo('Mongoose connected to db...')
})

mongoose.connection.on('error', err => {
  logInfo(err.message)
})

mongoose.connection.on('disconnected', () => {
  logInfo('Mongoose connection is disconnected...')
})

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
