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

logInfo('server starting')
initDb()

const server = express()
server.use(cors())
server.use(express.json())
server.use(requestLogger)

server.use('/v1/notes', NoteRouter)
server.use('/v1/users', UserRouter)
server.use('/v1/login', LoginRouter)

server.use(unknownEndpointHandler)
server.use(errorHandler)

server.listen(PORT_NUM)
logInfo(`server listening on port ${PORT_NUM}`)
