const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const helper = require('./test_helper')
// console.log("initialBloglist", helper.initialBloglist)

beforeEach(async () => {
  // jest.setTimeout(100000) 
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBloglist[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBloglist[1])
  await blogObject.save()
},100000)

test('correct amount of blog posts returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBloglist.length)
},100000)

test('unique ID property is named "id" --not "_id"', async () => {
  const response = await api.get('/api/blogs')
  const blogEntry = response.body[0]
  console.log("blogEntry", blogEntry)
  expect(blogEntry.id).toBeDefined()
}, 100000)

test.only('POST request successfully creates new blog post', async () => {
  const newBlog = { 
    title: 'willremovethissoon', 
    author: 'nobody', 
    url: 'www.yahoo.com', 
    likes: 1 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogListAtEnd = await helper.blogListInDb()
  expect(blogListAtEnd).toHaveLength(helper.initialBloglist.length + 1)

}, 100000)

afterAll(() => {
  mongoose.connection.close()
})