const getRandomBlog = require("../operations/getRandomBlog")

const getFeedBlogsOfUserIntrests = (allBlog, intrests) => {

    let feedBlogs = []


    for (let intrest of intrests) {

        feedBlogs.push(...allBlog.filter((sBlog) => sBlog.category.includes(intrest)))
    }

    feedBlogs = [...new Set(getRandomBlog(feedBlogs))]



    return feedBlogs;
}

module.exports = getFeedBlogsOfUserIntrests