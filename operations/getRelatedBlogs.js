const getRelatedBlogs = (blog, allBlog) => {
    const matchedBlog = []

    for (singleCategory of blog.category) {

        matchedBlog.push(allBlog.find(sBlog => sBlog.category.includes(singleCategory)))
    }
    const relatedBlog = [...new Set(matchedBlog)].filter(mB => mB.title !== blog.title)
    return relatedBlog;
}

module.exports = getRelatedBlogs