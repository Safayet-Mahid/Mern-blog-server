const router = require("express").Router()
const Blog = require("../models/Blog")
const getRelatedBlogs = require("../operations/getRelatedBlogs")

const { varifyToken } = require("./varify")

// create a blog post 
router.post("/", varifyToken, async (req, res) => {
    try {
        const data = req.body
        const blog = { ...data, authorId: req.user.id }
        const blogPost = new Blog(blog)
        const savedBlogPost = await blogPost.save()
        res.status(201).json(savedBlogPost)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// update a blog post 

router.put("/:blogId", varifyToken, async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.blogId)

        // console.log(blog)
        if (blog.authorId === req.user.id) {
            const updatedBlog = await Blog.findByIdAndUpdate(
                req.params.blogId,
                {
                    $set: req.body
                },
                { new: true }
            )
            res.status(200).json(updatedBlog)
        }
        else {
            res.status(403).json("Your are not allowed to delete this post")
        }



    } catch (err) {
        res.status(500).json(err)
    }
})

// delete blog 
router.delete("/:blogId", varifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId)
        // console.log(blog)

        if (blog.authorId === req.user.id) {
            // await Blog.deleteOne(blog)

            res.status(200).json("Post has been deleted")
        }
        else {
            res.status(403).json("Your are not allowed to delete this post")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
})




// get blog post
router.get("/find/:blogId", async (req, res) => {

    try {
        // const blog = await Blog.findOne({ _id: req.params.blogId })
        const title = req.params.blogId.replace(/-/g, " ") // send a dashed title to look good in url route
        const blog = await Blog.findOne({ title: title })


        // related blog with same topics 
        const allBlog = await Blog.find({})
        const relatedBlog = getRelatedBlogs(blog, allBlog)



        res.status(201).json({ blog, relatedBlog })

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