import express from 'express'
import Note from '../models/Note.js'
import User from '../models/User.js'

/**
 * Express router for handling test-related HTTP requests.
 * DONT EXPOSE ON PROD PLS :)
 * @type {express.Router}
 */
const TestingRouter = express.Router()

/**
 * Route to delete everything out the db.
 */
TestingRouter.get('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

export default TestingRouter
