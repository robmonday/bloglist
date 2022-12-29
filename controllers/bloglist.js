const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


bloglistRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({}).populate('user', { username: 1, name: 1 })
  bloglist.sort((firstObj, secondObj) => secondObj.likes - firstObj.likes) // sorted by likes descending
  response.json(bloglist)
})

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  console.log("User Found:", user)

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: 0,
    user: user._id // add user reference to blog
  })

  const savedBlog = await blog.save()  
  user.blogList = user.blogList.concat(savedBlog._id) // add blog reference to user
  await user.save()

  response.status(201).json(savedBlog)
})

bloglistRouter.put('/:id', async (request, response) => {

  // check for valid token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body

  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })

})

bloglistRouter.delete('/:id', async (request, response) => {
  
  // check for valid token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // check which user created blog post
  const blog = await Blog.findById(request.params.id)
  // console.log("blog object found", blog)
  
  const authorId = blog.user.toString()
  // console.log("author of blog post", authorId)

  const userId = decodedToken.id
  // console.log("user submitting request", userId)

  // if blog post was created by user, delete blog post
  // otherwise, return an error
  if (authorId === userId) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Post can only be deleted by user who created it.' })
  }

})

module.exports = bloglistRouter