const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

//update schema ok bro 
//blogSchema.set() is used to set options for the schema
blogSchema.set('toJSON', {
  transform: (doc, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  },
})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
