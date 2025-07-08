// utils/middleware.js
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

//userExtractor middleware
const userExtractor = async (request, response, next) => {
  try {
    const token = request.token
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' })
      }
      request.user = await User.findById(decodedToken.id)
    } else {
      request.user = null
    }
    next()
  } catch (error) {
    next(error)
  }
}
const errorHandler = (error, request, response, next) => {
//   console.error(error.name, error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'TypeError') {
    return response.status(500).json({ error: error.message })
  }

  next(error) // pass to default error handler if not handled here
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}
