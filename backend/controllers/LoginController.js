import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'express-async-errors'

import User from '../models/User.js'
/**
 * Create New Login 
 * @param {Request} req
 * @param {Response} res
 */

export const createNewLogin = async (req, res) => {
  const { username, password } = req.body
  console.log(express.request)

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

  res.status(200).json({
    token,
    username: user.username,
    name: user.name
  })
}
