const getRandomBlog = require("../operations/getRandomBlog")

// finds other blogs with same categories 

const getRelatedBlogs = (blog, allBlog) => {
    const matchedBlog = []

    for (singleCategory of blog.category) {

        matchedBlog.push(...allBlog.filter(sBlog => sBlog.category.includes(singleCategory)))
    }

    const randomRelatedBlog = getRandomBlog(matchedBlog)


    const relatedBlog = [...new Set(randomRelatedBlog)].filter(mB => mB.title !== blog.title)

    return relatedBlog;

}



module.exports = getRelatedBlogs