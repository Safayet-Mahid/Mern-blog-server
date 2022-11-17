const router = require("express").Router()

const Blog = require("../models/Blog")
const User = require("../models/User")


// author name must be sent as dashed 
router.get("/:authorName", async (req, res) => {
    const authorname = req.params.authorName.replace(/-/g, " ")
    try {
        // identifying an user as author 
        const author = await User.findOne({ username: authorname })
        // blogs of the user as author 
        const blogs = await Blog.find({ author: author.username })
        res.status(200).json({ author, blogs })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
