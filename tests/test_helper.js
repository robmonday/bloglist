// const Blog = require('../models/blog')
// const User = require('../models/user')

const initialBloglist = [
  {
    "title":"Best tricks for your dog",
    "author":"Rob Monday",
    "url":"http://www.dogtricks.com",
    "likes": 100
  },
  {
    "title":"How to care for your dog",
    "author":"Jennie Monday",
    "url":"http://www.petcare.com",
    "likes": 210
  }
]

const initialUserList = [
  {
    "username": "jdo",
    "name": "John Doe",
    "password": "123"
  },
  {
    "username": "mja",
    "name": "Michael Jackson",
    "password": "abc"
  }
]

// const nonExistingId = async () => {
//   const blog = new Blog({ title: 'willremovethissoon', author: 'nobody', url: 'www.yahoo.com', likes: 1 })
//   await blog.save()
//   await blog.remove()

//   return blog._id.toString()  // ???
// }

// const blogListInDb = async () => {
//   const blogList = await Blog.find({})
//   return blogList.map(blog => blog.toJSON())
// }

// const userListInDb = async () => {
//   const userList = await User.find({})
//   return userList.map(user => user.toJSON())
// }

module.exports = { 
  initialBloglist, 
  initialUserList, 
  // nonExistingId, 
  // blogListInDb, 
  // userListInDb, 
}