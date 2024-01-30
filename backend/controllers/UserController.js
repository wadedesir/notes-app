import User from '../models/User.js'
import bcryptjs from 'bcryptjs'

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes')
  res.json(users)
}

export const createNewUser = async (req, res, next) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (e) {
    next(e)
  }
}

export const findUserById = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      res.json({ message: `404 user with id:${id} not found` });
    } else {
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
}

export const updateUser = async (req, res, next) => {
  const body = req.body
  console.log(JSON.stringify(req.body))

  const userEdit = {
    content: body.content,
    important: body.important,
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, userEdit, { new: true })
    res.json(updatedUser)
  } catch (e) {
    next(e)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.json(deletedUser)
  } catch (e) {
    next(e)
  }
}
