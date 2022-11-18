const getRandomBlog = (blogArr) => {
    const randomBlog = []

    blogArr.map(blog => {
        const random = Math.floor(Math.random() * blogArr.length)

        randomBlog.splice(random, 0, blog)
    })

    return randomBlog
}

module.exports = getRandomBlog