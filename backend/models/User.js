import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

/**
 * Defines the schema for the User model.
 */
const userSchema = new mongoose.Schema({
  name: String,
  passwordHash: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
}, {
  timestamps: true
})

/**
 * Transforms the user object to JSON format.
 */
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

/**
 * Adds unique validation to the username field.
 */
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)
export default User
