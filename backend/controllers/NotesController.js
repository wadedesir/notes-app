import Note from '../models/Note.js'

export const getAllNotes = async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
}

export const createNewNote = async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
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

  const noteEdit = {
    content: body.content,
    important: body.important,
  }

  try {
    const updatedNote = Note.findByIdAndUpdate(req.params.id, noteEdit, { new: true })
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
