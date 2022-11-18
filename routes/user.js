const router = require("express").Router()
const User = require("../models/User")
const { varifyToken } = require("./varify")



// add to following list

// a query named operation must be sent to update intrests [ "follow" /"unfollow"]

router.put("/following", varifyToken, async (req, res) => {

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


// get user 
router.get("/:username", async (req, res) => {
    try {

        const user = await User.findOne({ username: req.params.username.replace(/-/g, " ") })
        res.status(200).json(user)

    }
    catch (err) {
        res.status(500).json(err)
    }
})





//update user

router.put("/:id", async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
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


// update Intrests

// a query named operation and a object named data must be sent to update intrests [ "add" /"delete"]

// format will be as below

// {
//     "data":"honey"
// }

router.put("/intrests/:id", async (req, res) => {

    const operation = req.query.operation


    try {
        let user;

        if (operation === "add") {
            user = await User.findByIdAndUpdate(
                req.params.id,
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