import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'express-async-errors'

import User from '../models/User.js'

/**
 * Creates a new login.
 * @module LoginController
 * @function
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {string} req.body.username - The user's display name.
 * @param {string} req.body.password - The user's password.
 */
export const createNewLogin = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  console.log(`the user id ${user._id}`)
  res.status(200).json({
    id: user._id,
    token,
    username: user.username,
    name: user.name
  })
}
