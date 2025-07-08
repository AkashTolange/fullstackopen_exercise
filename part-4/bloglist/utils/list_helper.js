// utils/list_helper.js


//dummy name function to return a constant value
const dummy = (blogs) => {
  return 1;
}

//for totalLikes function
// This function calculates the total number of likes across all blogs
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

//for favoriteBlog function
// This function finds the blog with the most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) => (blog.likes > (fav.likes || 0) ? blog : fav), {})
}

//for mostBlogs function 
// This function finds the author with the most blogs
// It returns an object with the author's name and the number of blogs they have written
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const counts = {}

  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  let maxAuthor = null
  let maxBlogs = 0

  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesCount = {}

  blogs.forEach(blog => {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + (blog.likes || 0)
  })

  let maxAuthor = null
  let maxLikes = 0

  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxLikes = likesCount[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
