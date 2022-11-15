const router = require("express").Router()
const Blog = require("../models/Blog")


// create a blog post 
router.post("/", async (req, res) => {
    try {
        const blogPost = new Blog(req.body)
        const savedBlogPost = await blogPost.save()
        res.status(201).json(savedBlogPost)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get blog post

router.get("/find/:blogId", async (req, res) => {

    try {
        const blog = await Blog.findOne({ blogId: req.params.blogId })
        res.status(201).json(blog)

    }
    catch (err) { }
    res.status(500).json(err)
})

module.exports = router