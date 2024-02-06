import bcryptjs from 'bcryptjs'
import 'express-async-errors'

import User from '../models/User.js'

/**
 * Get all users
 * @module UserController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes')
  res.json(users)
}

/**
 * Creates a new user.
 * @module UserController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.body.name - The user's first and last name.
 * @param {string} req.body.username - The user's display name.
 * @param {string} req.body.password - The user's password.
 */
export const createNewUser = async (req, res) => {
  const { username, name, password } = req.body
  const saltRounds = 10

  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
}

/**
 * Finds a user by ID.
 * @module UserController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.params.id - The user's ID.
 */
export const findUserById = async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      error: `user with id:${id} not found`
    })
  }
}

/**
 * Updates a user by ID.
 * @module UserController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.body.username - The user's display name.
 * @param {string} req.body.name - The user's first and last name.
 * @param {string} req.body.password - The user's password.
 * @param {string} req.params.id - The user's ID.
 */
export const updateUser = async (req, res) => {
  const { username, name, password } = req.body
  const { id } = req.params

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const updatedContent = {
    username,
    name,
    passwordHash
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedContent, { new: true })
  res.json(updatedUser)
}

/**
 * Deletes a user by ID.
 * @module UserController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.params.id - The user's ID.
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params

  const deletedUser = await User.findByIdAndDelete(id)
  res.status(204).json(deletedUser)
}
