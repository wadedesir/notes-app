import express from 'express'
import {
  getAllNotes,
  createNewNote,
  findNoteById,
  updateNote,
  deleteNote
} from '../controllers/NoteController.js'

const NoteRouter = express.Router()

/**
 * Route for all notes
 */
NoteRouter.get('/', getAllNotes)

/**
 * Route for creating new notes
 * @param {object} req.body - Body of the note
 */
NoteRouter.post('/', createNewNote)

/**
 * Route for handling note requests by ID
 * @param {string} req.params.id - ID of the note to retrieve
 */
NoteRouter.get('/:id', findNoteById)

/**
 * Route for updating notes by ID
 * @param {string} req.params.id - ID of the note to delete
 * @param {object} req.body - body of the updated note
 */
NoteRouter.put('/:id', updateNote)

/**
 * Route for deleting notes by ID
 * @param {string} req.params.id - ID of the note to delete
 */
NoteRouter.delete('/:id', deleteNote)

export default NoteRouter
