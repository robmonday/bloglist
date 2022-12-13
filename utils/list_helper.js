const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blogObj) => {
    return acc + blogObj.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { 
    return null 
  } else {
    blogs.sort((a,b) => b.likes - a.likes)
    console.log(blogs[0].likes)
    return blogs[0]
  }
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog
}