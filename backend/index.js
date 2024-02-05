import express from 'express'
import cors from 'cors'

import NoteRouter from './routes/NoteRouter.js'
import UserRouter from './routes/UserRouter.js'
import LoginRouter from './routes/LoginRouter.js'
import TestRouter from './routes/TestRouter.js'

import { initDb } from './util/db_util.js'
import { logInfo } from './util/logger.js'
import { PORT_NUM } from './util/config.js'
import {
  requestLogger,
  unknownEndpointHandler,
  errorHandler
} from './util/middleware.js'

// Init mongoDB and create the server.
logInfo('Server starting')
initDb()
const Server = express()

// Set up pre-request middleware.
Server.use(cors())
Server.use(express.json())
Server.use(express.static('dist'))
Server.use(requestLogger)

// Set up express routes.
Server.use('/v1/notes', NoteRouter)
Server.use('/v1/users', UserRouter)
Server.use('/v1/login', LoginRouter)
Server.use('/v1/test', TestRouter)

// Set up post-request middleware
Server.use(errorHandler)
Server.use(unknownEndpointHandler)

// Start the server on the specified port
Server.listen(PORT_NUM)
logInfo(`Server listening on port ${PORT_NUM}`)

export default Server
