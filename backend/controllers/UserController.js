import bcryptjs from 'bcryptjs'
import 'express-async-errors'

import User from '../models/User.js'

// TODO: unit test
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes')
  res.json(users)
}

/**
 * Create New User
 * @param {Request & {username: string, name:string, password: string}} request object 
 * @param {Response} Response
 * @param {NextFunction} Next
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
 * Find User By ID
 * @param {Request & {username: string, password: string}} request object 
 * @param {Response} Response
 * @param {NextFunction} Next
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
 * Update User
 * @param {Request} Request
 * @param {Response} Response
 * @param {NextFunction} Next
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
 * Delete User
 * @param {Request} Request
 * @param {Response} Response
 * @param {NextFunction} Next
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params

  const deletedUser = await User.findByIdAndDelete(id)
  res.json(deletedUser)
}
