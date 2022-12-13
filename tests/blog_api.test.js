const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const test_helper = require('./test_helper')
// console.log("initialBloglist", test_helper.initialBloglist)

beforeEach(async () => {
  jest.setTimeout(100000) 
  await Blog.deleteMany({})
  let blogObject = new Blog(test_helper.initialBloglist[0])
  await blogObject.save()
  blogObject = new Blog(test_helper.initialBloglist[1])
  await blogObject.save()
},100000)

test('correct amount of blog posts returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(test_helper.initialBloglist.length)
},100000)

test.only('unique ID property is named "id" --not "_id"', async () => {
  const response = await api.get('/api/blogs')
  const blogEntry = response.body[0]
  console.log("blogEntry", blogEntry)
  expect(blogEntry.id).toBeDefined()
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})