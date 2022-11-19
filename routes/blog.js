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

//sent a param name blogId

router.get("/find/:blogId", async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.blogId)


        // related blog with same topics 
        const allBlog = await Blog.find({})
        const relatedBlog = getRelatedBlogs(blog, allBlog)

        //other blogs of the same auther
        let autherAllBlogs = await Blog.find({ author: blog.author })

        // trim the main blog that the user orginally requested for 
        const autherOtherBlogs = autherAllBlogs.filter(sBlog => sBlog.id !== blog.id).reverse()

        res.status(201).json({ blog, relatedBlog, autherOtherBlogs })

    }
    catch (err) {
        res.status(500).json(err)
    }

})


module.exports = router