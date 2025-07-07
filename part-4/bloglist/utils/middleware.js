// utils/middleware.js

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  next(error) // pass to default error handler if not handled here
}

module.exports = {
  errorHandler,
}
