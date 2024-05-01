import express from 'express'
import sendChat from '../controllers/GPTController.js'



/**
 * Express router for handling note-related HTTP requests.
 * @type {express.Router}
 */
const GPTRouter = express.Router()

/**
 * Route to get all notes.
 */
GPTRouter.get('/', sendChat)

// /**
//  * Route to create a new note.
//  */
// NoteRouter.post('/', createNewNote)

// /**
//  * Route to find a note by ID.
//  */
// NoteRouter.get('/:id', findNoteById)

// /**
//  * Route to update a note by ID.
//  */
// NoteRouter.put('/:id', updateNote)

// /**
//  * Route to delete a note by ID.
//  */
// NoteRouter.delete('/:id', deleteNote)

export default GPTRouter
