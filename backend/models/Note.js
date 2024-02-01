import mongoose from 'mongoose'

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
},
{
  timestamps: true
})

noteSchema.set('toJSON', {
  transform: (doc, note) => {
    note.id = note._id.toString()
    delete note._id
    delete note.__v
  }
})

const Note = mongoose.model('Note', noteSchema)
export default Note
