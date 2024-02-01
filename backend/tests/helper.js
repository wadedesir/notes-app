import Note from "../models/Note.js"

export const initNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

export const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

export const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}
