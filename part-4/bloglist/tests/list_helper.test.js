// tests/list_helper.test.js

// const { test, describe} = require('node:test')
// const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// totalLikes tests
// favoriteBlog tests
// mostBlogs tests
// mostLikes tests

//remember only unit tests only here ok 
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
    // assert.strictEqual(result, 5)
    expect(result).toBe(5)

  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    // assert.strictEqual(result, 0)
    expect(result).toBe(0)
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
    // assert.strictEqual(result, 5)
    expect(result).toBe(5)
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
    // assert.deepStrictEqual(result, { title: 'Blog 2', likes: 10 })
    expect(result).toEqual({ title: 'Blog 2', likes: 10 })
  })

  test('empty list returns null', () => {
    const result = listHelper.favoriteBlog([])
    // assert.strictEqual(result, null)
    expect(result).toBeNull()
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
    // assert.deepStrictEqual(result, { author: 'Bob', blogs: 3 })
    expect(result).toEqual({ author: 'Bob', blogs: 3 })
  })

  test('empty list returns null', () => {
    const result = listHelper.mostBlogs([])
    // assert.strictEqual(result, null)
     expect(result).toBe(null)
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
    // assert.deepStrictEqual(result, { author: 'Alice', likes: 12 })
    expect(result).toEqual({ author: 'Alice', likes: 12 })
  })

  test('empty list returns null', () => {
    const result = listHelper.mostLikes([])
    // assert.strictEqual(result, null)
    expect(result).toBe(null)
  })
})



