const router = require("express").Router()

const Blog = require("../models/Blog")
const User = require("../models/User")


// param named authorId from the blog object must be sent

router.get("/:authorId", async (req, res) => {

    try {
        const author = await User.findById(req.params.authorId)

        // blogs of the user as author 
        const blogs = await Blog.find({ author: author.username })

        res.status(200).json({ author, blogs })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
