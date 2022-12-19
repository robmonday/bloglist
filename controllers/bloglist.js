const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


bloglistRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(bloglist)
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(body.userId)
  console.log("User Found:", user)

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    user: user._id // add user reference to blog
  })

  const savedBlog = await blog.save()  
  user.blogList = user.blogList.concat(savedBlog._id) // add blog reference to user
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = bloglistRouter