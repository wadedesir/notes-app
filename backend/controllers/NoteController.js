import jwt from 'jsonwebtoken'
import 'express-async-errors'

import Note from '../models/Note.js'
import User from '../models/User.js'

import { logInfo } from '../util/logger.js'
import { SECRET } from '../util/config.js'

// TODO: unit test
const getTokenFrom = authorization => {
  logInfo(`authorization: ${authorization}`)

  if (authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// TODO: unit test
export const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1, name: 1
  })

  res.json(notes)
}

// TODO: unit test
export const createNewNote = async (req, res) => {
  const { content, important } = req.body

  const authorization = req.get('authorization')
  if(!authorization){
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

// TODO: unit test
export const findNoteById = async (req, res) => {
  const { id } = req.params

  const note = await Note.findById(id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: `note with id:${id} not found` })
  }
}

// TODO: unit test
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
  )
  res.json(updatedNote)
}

// TODO: unit test
export const deleteNote = async (req, res) => {
  const { id } = req.params

  const deletedNote = await Note.findByIdAndDelete(id)
  res.status(204).json(deletedNote)
}
