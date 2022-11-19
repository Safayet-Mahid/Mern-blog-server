const jwt = require("jsonwebtoken")

const varifyToken = (req, res, next) => {

    const token = req.headers?.token?.split(" ")[1]
    if (token) {
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
            if (err) res.status(403).json("Token is not valid")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}


const varifyAuthorization = (req, res, next) => {
    varifyToken(req, res, () => {
        if (req.user.id === req.params.userId) {
            next()
        }
        else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}


module.exports = { varifyToken, varifyAuthorization }