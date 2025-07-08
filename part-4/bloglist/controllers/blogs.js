const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const blogsRouter = express.Router();

// blogsRouter.get('/',(request, response) => {
//   Blog.find({}).then((blogs) =>{
//     response.json(blogs)
//   })
// })

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

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
blogsRouter.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ ...req.body, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
    // const body = request.body;

    // const users = await User.find({});
    // const user = users[0]; // For now just pick the first user

    // const blog = new Blog({
    //   ...body,
    //   user: user._id,
    // });
    // // const blog = new Blog({
    // //   title: body.title,
    // //   author: body.author,
    // //   url: body.url,
    // //   likes: body.likes || 0,
    // // });

    // const savedBlog = await blog.save();
    // response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
    // console.error('POST /api/blogs error:', error.message)
    // response.status(500).json({ error: 'something went wrong' })
  }
});

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

//deleting a blog post
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    //here decodedToken is used to verify the user who is trying to delete the blog post
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()

    // Convert both IDs to strings for comparison
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: 'Only the creator can delete this blog' })
    }
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

//updating a blog post ok bro through___mainly likes
blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
