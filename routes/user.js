const router = require("express").Router()
const User = require("../models/User")


//Register new user

router.post("/register", async (req, res) => {
    const newUser = new User(
        req.body
    )

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (err) {
        res.json(err)
    }
})

//login user

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        const typedPassword = req.body.password

        !user && res.status(404).json("User not found")

        if (user && typedPassword === user.password) {

            return res.status(201).json({ id: user._id, username: user.username, email: user.email })
        } else {
            return res.status(401).json("password is incorrect")
        }


    } catch (err) {
        res.json(err)
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

// /update user intrests 


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