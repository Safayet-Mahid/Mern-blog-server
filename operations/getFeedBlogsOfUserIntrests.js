const getFeedBlogsOfUserIntrests = (allBlog, intrests) => {

    let feedBlogs = []

    for (let intrest of intrests) {

        feedBlogs.push(...allBlog.filter((sBlog) => sBlog.category.includes(intrest)))
    }

    return feedBlogs;
}

module.exports = getFeedBlogsOfUserIntrests