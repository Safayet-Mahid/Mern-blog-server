const Blog = require("../models/Blog")
const User = require("../models/User")
const getRandomBlog = require("../operations/getRandomBlog")

const { varifyToken } = require('../routes/varify')
const getFeedBlogsOfUserIntrests = require("../operations/getFeedBlogsOfUserIntrests")
const getFeedBlogsBasedOnUserFollowings = require("../operations/getFeedBlogsBasedOnUserFollowings")


const router = require("express").Router()

// based on user intrests 
// aquery name operation must be sent with value intrests / followings

router.get("/", varifyToken, async (req, res) => {

    try {
        const operation = req.query.operation

        // allblogs on Db
        const allBlogs = await Blog.find({})

        // get user 
        const user = await User.findById(req.user.id)


        // operation based on query [intrests / followings]
        if (operation === "intrests") {

            //get user intrests
            const userIntrests = user.intrests

            // blogs for user feed based on their intrests 
            const blogsBasedOnUserIntrests = getFeedBlogsOfUserIntrests(allBlogs, userIntrests)

            res.status(200).json(blogsBasedOnUserIntrests)
        }
        else if (operation === "followings") {

            //get user followed writer
            const userFollwings = user.followingList

            // blogs for user feed based on their intrests 
            const blogsBasedOnUserFollowings = getFeedBlogsBasedOnUserFollowings(allBlogs, userFollwings)

            res.status(200).json(blogsBasedOnUserFollowings)
        }







    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router