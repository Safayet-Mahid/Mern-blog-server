const router = require("express").Router()
const User = require("../models/User")



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



// a query must be sent to update intrests [ "add" /"delete"]
router.put("/intrests/:id", async (req, res) => {

    const operation = req.query.operation


    try {
        let user;
        console.log(req.body);

        if (operation === "add") {
            user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: req.body,
                },
                { new: true })
        }
        else if (operation === "delete") {
            user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: req.body
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