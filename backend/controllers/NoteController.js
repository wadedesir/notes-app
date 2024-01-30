import Note from '../models/Note.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  console.log(`authorization: ${authorization}`)

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    res.json(notes)
  } catch (e) {
    next(e)
  }
}

export const createNewNote = async (req, res, next) => {
  const { content, important } = req.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
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

    res.json(savedNote)
  } catch (e) {
    next(e)
  }
}

export const findNoteById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) {
      res.status(404).json({ error: `note with id:${id} not found` });
    } else {
      res.json(note);
    }

  } catch (e) {
    next(e);
  }
}

export const updateNote = async (req, res, next) => {
  const { content, important } = req.body
  const { id } = req.params

  const updatedContent = {
    content,
    important,
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, updatedContent, { new: true })
    res.json(updatedNote)
  } catch (e) {
    next(e)
  }
}

export const deleteNote = async (req, res, next) => {
  const { id } = req.params

  try {
    const deletedNote = await Note.findByIdAndDelete(id)
    res.json(deletedNote)
  } catch (e) {
    next(e)
  }
}
