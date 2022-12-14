const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')
const User = require('../models/user')

describe('original tests from lesson', () => {
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
      .get('/api/bloglist')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/bloglist')
    // console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBloglist.length)
  },100000)


  test('unique ID property is named "id" --not "_id"', async () => {
    const response = await api.get('/api/bloglist')
    const blogEntry = response.body[0]
    // console.log("blogEntry", blogEntry)
    expect(blogEntry.id).toBeDefined()
  }, 100000)


  // test('POST request successfully creates new blog post', async () => {
  //   const newBlog = { 
  //     title: 'willremovethissoon', 
  //     author: 'nobody', 
  //     url: 'www.yahoo.com', 
  //     // likes: 1 
  //   }
    
  //   await api
  //     .post('/api/bloglist')
  //     .send(newBlog)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/)
    
  //   const blogListAtEnd = await helper.blogListInDb()
  //   expect(blogListAtEnd).toHaveLength(helper.initialBloglist.length + 1)
    
  // }, 10**4)

})

describe('tests from exercises', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  }, 10**4)

  test('user is not created if username is missing', async (request, response) => {

    const newUser = { 
      username: 'robmonday', 
      name: 'Rob Monday', 
      password: '',
    }

    await api
      .post('/api/bloglist')
      .send(newUser)
      // .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(0)
  }, 10**4)
})

afterAll(() => {
  mongoose.connection.close()
})