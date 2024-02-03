import { logInfo } from './logger.js'

/**
 * Create New Login 
 * @param {Request} req
 * @param {Response} res
 */
export const requestLogger = (req, res, next) => {
  logInfo('Method:', req.method)
  logInfo('Path:  ', req.path)
  logInfo('Body:  ', req.body)
  logInfo('---')
  next()
}

/**
 * Create New Login 
 * @param {Request} req
 * @param {Response} res
 */
export const unknownEndpointHandler = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

/**
 * Create New Login 
 * @param {Request} req
 * @param {Response} res
 */
export const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }
  res.status(err.status || 500).json({ error: err })
}
