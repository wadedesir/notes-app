import mongoose from 'mongoose'

/**
 * Defines the schema for the Note model.
 */
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

/**
 * Transforms the note object to JSON format.
 */
noteSchema.set('toJSON', {
  transform: (doc, note) => {
    note.id = note._id.toString()
    if (note.createdAt) {
      note.createdAt = note.createdAt.toString()
    }
    if (note.updatedAt) {
      note.updatedAt = note.updatedAt.toString()
    }
    delete note._id
    delete note.__v
  }
})

const Note = mongoose.model('Note', noteSchema)
export default Note
