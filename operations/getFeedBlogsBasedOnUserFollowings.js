const getRandomBlog = require("../operations/getRandomBlog")

const getFeedBlogsBasedOnUserFollowings = (allBlogs, userFollwings) => {
    let feedBlogs = []

    for (sFollow of userFollwings) {

        feedBlogs.push(...allBlogs.filter(sBlog => sBlog.authorId === sFollow.id))
    }

    feedBlogs = [...new Set(getRandomBlog(feedBlogs))]

    return feedBlogs

}

module.exports = getFeedBlogsBasedOnUserFollowings