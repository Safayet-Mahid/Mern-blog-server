const router = require("express").Router()
const User = require("../models/User")


//Register new user

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (err) {
        res.status(500).json(err)
    }
})

//login user

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        const typedPassword = req.body.password

        !user && res.status(404).json("User not found")

        if (user && typedPassword === user.password) {
            return res.status(201).json(user)
        } else {
            return res.status(401).json("password is incorrect")
        }


    } catch (err) {
        res.json(err)
    }
})


module.exports = router