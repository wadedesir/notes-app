import express from 'express';
import { 
  createNewUser, 
  findUserById, 
  updateUser, 
  deleteUser,
} from '../controllers/UserController.js'

const UserRouter = express.Router()

/**
 * Route for creating new users
 * @param {object} req.body - Body of the user
 */
UserRouter.post('/', createNewUser)

/**
 * Route for handling user requests by ID
 * @param {string} req.params.id - ID of the user to retrieve
 */
UserRouter.get('/:id', findUserById)

/**
 * Route for updating users by ID
 * @param {string} req.params.id - ID of the user to delete
 * @param {object} req.body - body of the updated user
 */
UserRouter.put('/:id', updateUser)

/**
 * Route for deleting users by ID
 * @param {string} req.params.id - ID of the user to delete
 */
UserRouter.delete('/:id', deleteUser)

export default UserRouter
