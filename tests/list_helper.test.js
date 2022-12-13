const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithTwoBlogs = [
  ...listWithOneBlog, 
  {
    _id: '1',
    title: 'Another',
    author: 'Author',
    url: 'http://www.google.com',
    likes: 4,
    __v: 0
  } 
]


describe('total likes', () => {
  
  test('is zero if no objects', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('is 5 if one object has 5 likes', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('is 9 if two objects have 5 and 4 likes', () => {
    expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(9)
  })

})

describe('favorite blog', () => {

  test('is null if no blog entries', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('has 5 likes if two entries with 5 and 4 likes', () => {
    expect(listHelper.favoriteBlog(listWithTwoBlogs).likes).toEqual(5)
  })

})

// console.log("listWithOneBlog", listWithOneBlog)
// console.log("listWithTwoBlogs", listWithTwoBlogs)
