

//all our integration tests for blog routes will go here 


const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

//import this 
const bcrypt = require('bcrypt')  
const User = require('../models/user')

//supertest is used to test HTTP requests
//supertest(app) creates a test instance of the app
const api = supertest(app)



const initialBlogs = [
  {
    title: 'First blog',
    author: 'Author One',
    url: 'http://example.com/1',
    likes: 1,
  },
  {
    title: 'Second blog',
    author: 'Author Two',
    url: 'http://example.com/2',
    likes: 2,
  },
]


let token =''

// Connect to the test database before running tests
//beforeEach is used to run a function before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const result = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  token = result.body.token

})

test('blogs are returned as JSON and correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

//adding test for id field 
// This test checks if the id field is defined in the blog posts

test('blog posts have id property defined', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined()
})


//add post test 

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Token Auth Blog',
    author: 'Akash',
    url: 'http://akashblog.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // Set the token in the header
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(1)

  // const titles = blogsAtEnd.map(b => b.title)
  // expect(titles).toContain('New Blog')
})


//add test for default likes 
test('likes default to 0 if missing', async () => {
  const blogWithoutLikes = {
    title: 'No Likes Blog',
    author: 'Anonymous',
    url: 'http://nolikes.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)

  expect(response.body.likes).toBe(0)
})


//respond 400 if titile or url is missing
//add test 
test('blog without title and url is not added', async () => {
  const invalidBlog = {
    author: 'Invalid Author',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

//test for deleting a blog post
test('a blog can be deleted', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  const ids = blogsAtEnd.map(b => b.id)
  expect(ids).not.toContain(blogToDelete.id)
})


//test for PUT updating a blog post
test('a blog\'s likes can be updated', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    ...blogToUpdate.toJSON(),
    likes: blogToUpdate.likes + 5,
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(blogToUpdate.likes + 5)
})

//adding failing test if no token 
test('blog post fails without token', async () => {
  const newBlog = {
    title: 'No Token',
    author: 'Anonymous',
    url: 'https://example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogs = await Blog.find({})
  expect(blogs).toHaveLength(0)
})


//adding test DELETE only works if user owns the blog 
test('blog can be deleted by the user who created it', async () => {
  const newBlog = {
    title: 'Deletable Blog',
    author: 'Owner',
    url: 'https://delete.com',
    likes: 1
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

  const blogToDelete = response.body

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAfter = await Blog.find({})
  expect(blogsAfter).toHaveLength(0)
})


//afterAll is used to run a function after all tests are done
afterAll(async () => {
  await mongoose.connection.close()
})
