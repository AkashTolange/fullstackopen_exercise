const mongoose = require('mongoose')


//this is the user schema ok bro and same as u did in blog schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  name: String,
  passwordHash: { 
    type: String, 
    required: true 
},
  blogs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Blog' }]
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
