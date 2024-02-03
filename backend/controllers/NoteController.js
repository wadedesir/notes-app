import jwt from 'jsonwebtoken'
import 'express-async-errors'

import Note from '../models/Note.js'
import User from '../models/User.js'

import { logInfo } from '../util/logger.js'
import { SECRET } from '../util/config.js'

/**
 * Extracts the JWT token from the authorization header.
 * @module NoteController
 * @private
 * @function
 * @param {string} authorization - The auth header striNg.
 * @returns {string|null} The extracted token or null if not found.
 */
const getTokenFrom = authorization => {
  logInfo(`authorization: ${authorization}`)

  if (authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

/**
 * Retrieves all notes from the database.
 * @module NoteController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
export const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1, name: 1
  })

  res.json(notes)
}

/**
 * Creates a new note and saves it to the database.
 * @module NoteController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.headers.authorization - The auth header containing user's auth token.
 * @param {string} req.body.content - The content of the note.
 * @param {boolean} req.body.important - Indicates whether the note is important.
 */
export const createNewNote = async (req, res) => {
  const { content, important } = req.body

  const authorization = req.get('authorization')
  if (!authorization) {
    return res.status(400).json({ error: 'must provide auth token' })
  }

  const decodedToken = jwt.verify(getTokenFrom(authorization), SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content,
    important: important || false,
    user: user.id
  })

  const savedNote = await note.save()

  user.notes = user.notes.concat(savedNote._id)

  await user.save()

  res.status(201).json(savedNote)
}

/**
 * Finds a note by ID in the database.
 * @module NoteController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.params.id - The ID of the note.
 */
export const findNoteById = async (req, res) => {
  const { id } = req.params

  const note = await Note.findById(id).populate('user', { username: 1, name: 1 })
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: `note with id:${id} not found` })
  }
}

/**
 * Updates a note by ID in the database.
 * @module NoteController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.params.id - The ID of the note to update.
 * @param {string} req.body.content - The updated content of the note.
 * @param {boolean} req.body.important - The updated importance status of the note.
 */
export const updateNote = async (req, res) => {
  const { content, important } = req.body
  const { id } = req.params

  const updatedContent = {
    content,
    important
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    updatedContent,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  res.json(updatedNote)
}

/**
 * Deletes a note by ID from the database.
 * @module NoteController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.params.id - The ID of the note to delete.
 */
export const deleteNote = async (req, res) => {
  const { id } = req.params

  const deletedNote = await Note.findByIdAndDelete(id).populate('user', { username: 1, name: 1 })
  res.status(204).json(deletedNote)
}
