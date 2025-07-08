const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
require('dotenv').config()

// const config = require('./utils/config')
// const logger = require('./utils/logger')

const app = express()

// const mongoUrl = 'mongodb+srv://tolangeakash753:bloglist@cluster1.go3atd8.mongodb.net/BlogList?retryWrites=true&w=majority&appName=Cluster1'
mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)  
// app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor,blogsRouter)

module.exports = app
