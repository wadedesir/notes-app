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
Server.use(cors())
Server.use(express.json())
Server.use(requestLogger)

Server.use('/v1/notes', NoteRouter)
Server.use('/v1/users', UserRouter)
Server.use('/v1/login', LoginRouter)

Server.use(unknownEndpointHandler)
Server.use(errorHandler)

Server.listen(PORT_NUM)
logInfo(`Server listening on port ${PORT_NUM}`)

export default Server
