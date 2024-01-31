import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const createNewLogin = async (req, res, next) => {
  const { username, password } = req.body

  try {
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
      id: user._id,
    }

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      { expiresIn: 60*60 }
    )

    res.status(200).send({ 
      token, 
      username: user.username, 
      name: user.name 
    })
  } catch (e) {
    next(e)
  }
}