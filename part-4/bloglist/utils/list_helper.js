// utils/list_helper.js


//dummy name function to return a constant value
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) => (blog.likes > (fav.likes || 0) ? blog : fav), {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
