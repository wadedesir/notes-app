import express from 'express'
import {
  getAllNotes,
  createNewNote,
  findNoteById,
  updateNote,
  deleteNote
} from '../controllers/NoteController.js'

/**
 * Express router for handling note-related HTTP requests.
 * @type {express.Router}
 */
const NoteRouter = express.Router()

/**
 * Route to get all notes.
 */
NoteRouter.get('/', getAllNotes)

/**
 * Route to create a new note.
 */
NoteRouter.post('/', createNewNote)

/**
 * Route to find a note by ID.
 */
NoteRouter.get('/:id', findNoteById)

/**
 * Route to update a note by ID.
 */
NoteRouter.put('/:id', updateNote)

/**
 * Route to delete a note by ID.
 */
NoteRouter.delete('/:id', deleteNote)

export default NoteRouter
