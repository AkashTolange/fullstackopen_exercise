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
