import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

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
  ],
}, {
  timestamps: true
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema);
export default User;
