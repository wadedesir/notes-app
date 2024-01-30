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

export const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
}

export const createNewNote = async (req, res, next) => {
  const body = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  try {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
}

export const findNoteById = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const note = await Note.findById(id);
    if (!note) {
      res.status(404);
      res.json({ message: `404 note with id:${id} not found` });
    } else {
      res.json(note);
    }
  } catch (e) {
    next(e);
  }
}

export const updateNote = async (req, res, next) => {
  const body = req.body
  console.log(JSON.stringify(req.body))

  const noteEdit = {
    content: body.content,
    important: body.important,
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, noteEdit, { new: true })
    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    res.json(deletedNote)
  } catch (error) {
    next(error)
  }
}
