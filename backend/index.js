import express from 'express'
import chalk from 'chalk'
import cors from 'cors'

import NoteRouter from './routes/NoteRouter.js'
import UserRouter from './routes/UserRouter.js'
import LoginRouter from './routes/LoginRouter.js'

import { initDb } from './util/db_util.js'

import { readFileSync } from "fs"
const packageJson = JSON.parse(readFileSync("./package.json"))

console.log(chalk.green("Server Starting!"))

initDb()

const server = express()

server.use(cors())
server.use(express.json())

server.use('/v1/notes', NoteRouter)
server.use('/v1/users', UserRouter)
server.use('/v1/login', LoginRouter)

/**
 * Route for fetching server status
 */
server.get("/status", (req, res) => {
  const statusObj = {
    server_port: PORT,
    server_version: packageJson.version,
  }
  res.json(statusObj)
})

/**
 * Global error handling middleware
 */
server.use((err, req, res, next) => {
  console.error(chalk.red(err))
  res.status(err.status || 500).json({ status: err.status, message: err.message })
})

const PORT = process.env.PORT || 8420
server.listen(PORT)

console.log(chalk.green(`server listening on port ${PORT}`))
