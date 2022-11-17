const Blog = require("../models/Blog")
const { findById } = require("../models/User")
const User = require("../models/User")

const getAllCategory = require("../operations/getAllCategory")
const { varifyToken } = require('../routes/varify')
const getFeedBlogsOfUserIntrests = require("../operations/getFeedBlogsOfUserIntrests")


const router = require("express").Router()

// based on user intrests 
router.get("/", varifyToken, async (req, res) => {

    try {
        //get user intrests
        const user = await User.findById(req.user.id)
        const userIntrests = user.intrests

        // allblogs on Db
        const allBlogs = await Blog.find({})

        // blogs for user feed based on their intrests 
        const blogsBasedOnUserIntrests = getFeedBlogsOfUserIntrests(allBlogs, userIntrests)


        res.status(200).json(blogsBasedOnUserIntrests)

    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router