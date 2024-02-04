import express from 'express'
import {
  createNewLogin
} from '../controllers/LoginController.js'

/**
 * Express router for handling login-related HTTP requests.
 * @type {express.Router}
 */
const LoginRouter = express.Router()

/**
 * Route to create a new login.
 */
LoginRouter.post('/', createNewLogin)

export default LoginRouter
