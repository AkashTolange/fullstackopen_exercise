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
blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
    // console.error('POST /api/blogs error:', error.message)
    // response.status(500).json({ error: 'something went wrong' })
  }
})

//deleting a blog post 
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

//updating a blog post ok bro through___mainly likes 
blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})



module.exports = blogsRouter
