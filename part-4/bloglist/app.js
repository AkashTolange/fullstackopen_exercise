const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = 'mongodb+srv://tolangeakash753:bloglist@cluster1.go3atd8.mongodb.net/BlogList?retryWrites=true&w=majority&appName=Cluster1'
mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
