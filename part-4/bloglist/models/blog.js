const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Make title required
  },
  author: {
    type: String,
    required: true, // Make author required
  },
  url: {
    type: String,
    required: true, // Make url required
  },
  likes: {
    type: Number,
    default: 0, // Set default value for likes
  }
})

//update schema ok bro 
//blogSchema.set() is used to set options for the schema
blogSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
