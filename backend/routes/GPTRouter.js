import express from 'express'
import { noteAssist, noteEnhance } from '../controllers/GPTController.js'



/**
 * Express router for handling note-related HTTP requests.
 * @type {express.Router}
 */
const GPTRouter = express.Router()

// GPTRouter.get('/', sendChat)

/**
 * Route to generate additional note data.
 */
GPTRouter.post('/', noteAssist)

/**
 * Route to create a new note.
 */
GPTRouter.post('/enhance', noteEnhance)

export default GPTRouter
