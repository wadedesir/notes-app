import User from '../models/User.js'
import bcryptjs from 'bcryptjs'

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes')
  res.json(users)
}

export const createNewUser = async (req, res, next) => {
  const { username, name, password } = req.body
  const saltRounds = 10

  try {
    const passwordHash = await bcryptjs.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (e) {
    next(e)
  }
}

export const findUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ 
        error: `user with id:${id} not found` 
      });
    } else {
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
}

export const updateUser = async (req, res, next) => {
  const { username, name, password} = req.body
  const { id } = req.params

  try {
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const updatedContent = {
      username,
      name,
      passwordHash
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedContent, { new: true })
    res.json(updatedUser)
  } catch (e) {
    next(e)
  }
}

export const deleteUser = async (req, res, next) => {
  const { id } = req.params

  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (e) {
    next(e)
  }
}
