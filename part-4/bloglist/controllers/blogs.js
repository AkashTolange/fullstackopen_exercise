const express = require('express')
const Blog = require('../models/blog')

const blogsRouter = express.Router()

// blogsRouter.get('/',(request, response) => {
//   Blog.find({}).then((blogs) =>{
//     response.json(blogs)
//   })
// })


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)
//   blog.save().then(result => res.status(201).json(result))
// })

//change from then catch to async await
// blogsRouter.post('/', async (request, response) => {
//   const blog = new Blog(request.body)
//   const savedBlog = await blog.save()
//   response.status(201).json(savedBlog)
// })
//updating this post logic to apply default
blogsRouter.post('/', async (request, response) => {
  // const blog = new Blog(request.body)
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, // Set likes to 0 if not provided
  })
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
