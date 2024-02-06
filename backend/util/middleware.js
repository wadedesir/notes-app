import { logInfo } from './logger.js'

/**
 * Logs request method, path, and body to the console.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
export const requestLogger = (req, res, next) => {
  logInfo('Method:', req.method)
  logInfo('Path:  ', req.path)
  logInfo('Body:  ', req.body)
  logInfo('---')
  next()
}

/**
 * Handles requests to unknown endpoints with a 404 status and JSON response.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const unknownEndpointHandler = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

/**
 * Handles various types of errors and sends appropriate JSON responses.
 * @param {Error} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
export const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }
  res.status(err.status || 500).json({ error: err.message })
}
