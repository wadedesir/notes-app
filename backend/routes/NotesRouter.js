import express from 'express';
import { 
  getAllNotes, 
  createNewNote, 
  findNoteById, 
  updateNote, 
  deleteNote,
} from '../controllers/NotesController.js'

const NotesRouter = express.Router()

/**
 * Route for all notes
 */
NotesRouter.get('/', getAllNotes)

/**
 * Route for creating new notes
 * @param {object} req.body - Body of the note
 */
NotesRouter.post('/', createNewNote)

/**
 * Route for handling note requests by ID
 * @param {string} req.params.id - ID of the note to retrieve
 */
NotesRouter.get('/:id', findNoteById)

/**
 * Route for updating notes by ID
 * @param {string} req.params.id - ID of the note to delete
 * @param {object} req.body - body of the updated note
 */
NotesRouter.put('/:id', updateNote)

/**
 * Route for deleting notes by ID
 * @param {string} req.params.id - ID of the note to delete
 */
NotesRouter.delete('/:id', deleteNote)

export default NotesRouter
