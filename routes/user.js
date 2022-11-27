const router = require("express").Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const { varifyToken, varifyAuthorization } = require("./varify")



// add to following list [which consequently update the follower list of the person who is being followed bty the user]

// a query named operation and a param name userId must be sent to update intrests [ "follow" /"unfollow"]

router.put("/:userId/following", varifyAuthorization, async (req, res) => {

    const operation = req.query.operation

    try {
        let user;
        let followingProfile;
        if (operation === "follow") {
            user = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $addToSet: { followingList: req.body }
                },
                { new: true }
            )

            followingProfile = await User.findByIdAndUpdate(req.body.id,
                {
                    $addToSet: { followerList: { name: user.username, id: user.id } }
                },
                { new: true })
        }

        else if (operation === "unfollow") {
            user = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $pull: { followingList: req.body }
                },
                { new: true }
            )
            followingProfile = await User.findByIdAndUpdate(
                req.body.id,
                {
                    $pull: { followerList: { name: user.username, id: user.id } }
                },
                { new: true }
            )
        }

        res.status(200).json({ user, followingProfile })
    }

    catch (err) {
        res.status(500).json(err)
    }

})


// update bookmarked blogs

// a query named operation and a param name userId must be sent to update intrests [ "follow" /"unfollow"]

router.put("/:userId/bookmark", varifyAuthorization, async (req, res) => {
    const operation = req.query.operation

    try {
        let user
        if (operation === "add") {
            user = await User.findByIdAndUpdate(
                req.user.id,
                { $addToSet: { bookmarked: req.body } },
                { new: true }
            )

            res.status(200).json(user)

        }
        else if (operation === "delete") {
            user = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $pull: { bookmarked: req.body }
                },
                { new: true }
            )
            res.status(200).json(user)
        }


    }

    catch (err) {
        res.status(500).json(err)
    }

})

// get user 
router.get("/:userId", varifyToken, async (req, res) => {
    try {

        const user = await User.findById(req.params.userId)

        // blogs of the user as author 
        const blogs = await Blog.find({ author: user.username })

        res.status(200).json({ user, blogs })


    }
    catch (err) {
        res.status(500).json(err)
    }
})






//update user

//sent a param name userId

router.put("/:userId", varifyAuthorization, async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: req.body
            },
            { new: true })
        res.status(200).json(user)


    }
    catch (err) {
        res.status(500).json(err)
    }

})



router.put("/:userId/intrests", varifyAuthorization, async (req, res) => {

    const operation = req.query.operation


    try {
        let user;

        if (operation === "add") {
            user = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $addToSet: { intrests: req.body.data },
                },
                { new: true })
        }
        else if (operation === "delete") {
            user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { intrests: req.body.data }
                },
                { new: true })
        }
        res.status(200).json(user)

    }
    catch (err) {
        res.status(500).json(err)
    }

})








module.exports = router