import { logInfo } from './logger.js'

export const requestLogger = (req, res, next) => {
  logInfo('Method:', req.method)
  logInfo('Path:  ', req.path)
  logInfo('Body:  ', req.body)
  logInfo('---')
  next()
}

export const unknownEndpointHandler = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

export const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  res.status(err.status || 500).json({ status: err.status, message: err.message })
}
