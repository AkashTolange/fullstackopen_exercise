// tests/list_helper.test.js

const { test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Blog 1',
        likes: 2
      },
      {
        title: 'Blog 2',
        likes: 3
      }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 5)
  })
})


//for favorite blog tests
describe('favorite blog', () => {
  const blogs = [
    { title: 'Blog 1', likes: 2 },
    { title: 'Blog 2', likes: 10 },
    { title: 'Blog 3', likes: 5 }
  ]

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, { title: 'Blog 2', likes: 10 })
  })

  test('empty list returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})


//for most blogs tests
describe('most blogs', () => {
  const blogs = [
    { author: 'Alice' },
    { author: 'Bob' },
    { author: 'Alice' },
    { author: 'Charlie' },
    { author: 'Bob' },
    { author: 'Bob' }
  ]

  test('returns the author with most blogs and count', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Bob', blogs: 3 })
  })

  test('empty list returns null', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })
})

//for most likes tests
// This test checks if the author with the most likes is returned correctly
describe('most likes', () => {
  const blogs = [
    { author: 'Alice', likes: 5 },
    { author: 'Bob', likes: 3 },
    { author: 'Alice', likes: 7 },
    { author: 'Charlie', likes: 2 }
  ]

  test('returns the author with most likes and total count', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Alice', likes: 12 })
  })

  test('empty list returns null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })
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
    title: 'New Blog',
    author: 'New Author',
    url: 'http://newblog.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('New Blog')
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
