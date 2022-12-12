const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  
    test('is zero if no objects', () => {
      expect(listHelper.totalLikes([])).toBe(0)
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

  test('is 5 if one object has 5 likes', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Another',
      author: 'Author',
      url: 'http://www.google.com',
      likes: 6,
      __v: 0
    } 
  ]

  test('is 9 if two objects have 3 and 6 likes', () => {
    expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(9)
  })

})