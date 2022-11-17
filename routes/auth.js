const router = require("express").Router()
const User = require("../models/User")

const jwt = require("jsonwebtoken")




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
        // console.log(user)
        const typedPassword = req.body.password

        !user && res.status(404).json("User not found")

        if (user && typedPassword === user.password) {

            const accessToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SEC_KEY,
                { expiresIn: "3d" }
            )


            return res.status(201).json({ id: user._id, username: user.username, email: user.email, accessToken })
        } else {
            return res.status(401).json("password is incorrect")
        }


    } catch (err) {
        res.json(err)
    }
})


module.exports = router