import express from 'express'
import cors from 'cors'

import NoteRouter from './routes/NoteRouter.js'
import UserRouter from './routes/UserRouter.js'
import LoginRouter from './routes/LoginRouter.js'

import { initDb } from './util/db_util.js'
import { logInfo } from './util/logger.js'
import { PORT_NUM } from './util/config.js'
import {
  requestLogger,
  unknownEndpointHandler,
  errorHandler
} from './util/middleware.js'

logInfo('Server starting')
initDb()

const Server = express()
Server.use(express.static('dist'))
Server.use(cors())
Server.use(express.json())
// TODO: unit test
Server.use(requestLogger)

Server.use('/v1/notes', NoteRouter)
Server.use('/v1/users', UserRouter)
Server.use('/v1/login', LoginRouter)

// TODO: unit test
Server.use(unknownEndpointHandler)
// TODO: unit test
Server.use(errorHandler)

Server.listen(PORT_NUM)
logInfo(`Server listening on port ${PORT_NUM}`)

export default Server
