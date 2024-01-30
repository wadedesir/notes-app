import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    content: String,
    important: Boolean,
  },
  {
    timestamps: true
  }
)

const Note = mongoose.model('Note', noteSchema)
export default Note
