const getOtherBlogsofSameAuthor = () => {

    let blogs = []

    blogs = myArr.filter(sBlog => sBlog._id !== blog._id).reverse()

    return blogs

}

module.exports = getOtherBlogsofSameAuthor