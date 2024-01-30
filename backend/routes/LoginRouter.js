import express from 'express';
import { 
  createNewLogin, 
} from '../controllers/LoginController.js'

const LoginRouter = express.Router()

/**
 * Route for creating new logins
 * @param {object} req.body - Body of the login
 */
LoginRouter.post('/', createNewLogin)

export default LoginRouter
