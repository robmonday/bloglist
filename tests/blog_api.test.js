const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')
const User = require('../models/user')

describe('original tests from lesson', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBloglist[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBloglist[1])
    await blogObject.save()
  }, 10*1000)

  test('correct amount of blog posts returned in JSON format', async () => {
    await api
      .get('/api/bloglist')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/bloglist')
    expect(response.body).toHaveLength(helper.initialBloglist.length)
  }, 10*1000)


  test('unique ID property is named "id" --not "_id"', async () => {
    const response = await api.get('/api/bloglist')
    const blogEntry = response.body[0]
    expect(blogEntry.id).toBeDefined()
  }, 10*1000)

}, 20*1000)

describe('user', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(helper.initialUserList[0])
    await userObject.save()
    userObject = new User(helper.initialUserList[1])
    await userObject.save()
  }, 10*1000)

  test("new record NOT sucessfully created if missing username or password", async () => {
    const responseBefore = await api.get('/api/users')
    const userCountBefore = responseBefore.body.length

    const newUser1 = {
      "username": "",
      "name": "Johnny Cash",
      "password": "abc123"      
    }
    
    await api.post('/api/users').send(newUser1).expect(400).expect('Content-Type', /application\/json/)

    const newUser2 = {
      "username": "cashmoney",
      "name": "Johnny Cash",
      "password": ""      
    }
    
    await api.post('/api/users').send(newUser2).expect(400).expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/users')
    const userCountAfter = responseAfter.body.length

    expect(userCountAfter).toEqual(userCountBefore)
  }, 15*1000)

  test("new record NOT sucessfully created if username or password are too short", async () => {
    const responseBefore = await api.get('/api/users')
    const userCountBefore = responseBefore.body.length

    const newUser1 = {
      "username": "jo",
      "name": "Johnny Cash",
      "password": "abc123"      
    }
    
    await api.post('/api/users').send(newUser1).expect(400).expect('Content-Type', /application\/json/)

    const newUser2 = {
      "username": "cashmoney",
      "name": "Johnny Cash",
      "password": "jo"      
    }
    
    await api.post('/api/users').send(newUser2).expect(400).expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/users')
    const userCountAfter = responseAfter.body.length

    expect(userCountAfter).toEqual(userCountBefore)
  }, 15*1000)

  test("new record NOT sucessfully created if username is not unique", async () => {
    const responseBefore = await api.get('/api/users')
    const userCountBefore = responseBefore.body.length

    const newUser1 = helper.initialUserList[0]
    
    await api.post('/api/users').send(newUser1).expect(400).expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/users')
    const userCountAfter = responseAfter.body.length

    expect(userCountAfter).toEqual(userCountBefore)
  }, 15*1000)

  test("valid new record is sucessfully created", async () => {
    const responseBefore = await api.get('/api/users')
    const userCountBefore = responseBefore.body.length

    const newUser = {
      "username": "jca",
      "name": "Johnny Cash",
      "password": "abc"      
    }
    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/users')
    const userCountAfter = responseAfter.body.length

    expect(userCountAfter).toEqual(userCountBefore + 1)
  }, 10*1000)

}, 20*1000)

afterAll(() => {
  mongoose.connection.close()
}, 10*1000)