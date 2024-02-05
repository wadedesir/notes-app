import express from 'express'
import {
  getAllUsers,
  createNewUser,
  findUserById,
  updateUser,
  deleteUser
} from '../controllers/UserController.js'

/**
 * Express router for handling user-related HTTP requests.
 * @type {express.Router}
 */
const UserRouter = express.Router()

/**
 * Route to get all users.
 */
UserRouter.get('/', getAllUsers)

/**
 * Route to create a new user.
 */
UserRouter.post('/', createNewUser)

/**
 * Route to find a user by ID.
 */
UserRouter.get('/:id', findUserById)

/**
 * Route to update a user by ID.
 */
UserRouter.put('/:id', updateUser)

/**
 * Route to delete a user by ID.
 */
UserRouter.delete('/:id', deleteUser)

export default UserRouter
