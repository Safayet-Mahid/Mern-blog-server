const router = require("express").Router()
const { update, rawListeners } = require("../models/Blog")
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

// update a blog post 

router.put("/:blogId", async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.blogId,
            {
                $set: req.body
            },
            { new: true }
        )
        res.status(200).json(updatedBlog)

    } catch (err) {
        res.status(500).json(err)
    }
})

// get blog post
router.get("/find/:blogId", async (req, res) => {

    try {
        const blog = await Blog.findOne({ _id: req.params.blogId })
        res.status(201).json(blog)

    }
    catch (err) {
        res.status(500).json(err)
    }

})

// find blog post of same author

router.get("/find/", async (req, res) => {
    const author = req.query.author
    try {

        const blogs = await Blog.find({ author })
        res.status(201).json(blogs)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router