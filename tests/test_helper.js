const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'nobody', url: 'www.yahoo.com', likes: 1 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()  // ???
}

const blogListInDb = async () => {
  const blogList = await Blog.find({})
  return blogList.map(blog => blog.toJSON())
}

module.exports = { initialBloglist, nonExistingId, blogListInDb }

// same as 
// module.exports.initialBloglist = initialBloglist
// module.exports.nonExistingId = nonExistingId
// module.exports.blogListInDb = blogListInDb