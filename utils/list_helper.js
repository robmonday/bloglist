const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blogObj) => {
    return acc + blogObj.likes
  }, 0)
}

module.exports = {
  dummy, 
  totalLikes
}