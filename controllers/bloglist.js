const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


bloglistRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({})
  response.json(bloglist)
})

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    user: user._id
  })


  const savedBlog = await blog.save()
  
  response.status(201).json(savedBlog)
})

module.exports = bloglistRouter