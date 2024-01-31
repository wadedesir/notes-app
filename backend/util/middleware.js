import { logInfo } from './logger.js'

export const requestLogger = (req, res, next) => {
  logInfo('Method:', req.method)
  logInfo('Path:  ', req.path)
  logInfo('Body:  ', req.body)
  logInfo('---')
  next()
}

export const unknownEndpointHandler = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' })
}

export const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return response.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ err: err.message })
  }
  res.status(err.status || 500).json({ status: err.status, message: err.message })
}
