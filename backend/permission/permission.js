const userModel = require("../Models/users");
const jwt = require("jsonwebtoken")
require("dotenv").config()

function authentification(req, res, next) {
    const cookie = req.cookies.jwt
    if (!cookie) return res.status(401).json({ message: "Unauthenticated" })

    try {
        const data = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET,)
        req.user = data._id
        next()

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.clearCookie("jwt", { httOnly: true })
            return res.status(401).json({ message: "Token have expired, login again" })
        }
        return res.status(401).json({ message: "Unauthenticated" })
    }
}

const typePermission = (role) => async (req, res, next) => {
    try {
        user = await userModel.findById(req.user)
        const { name, email, userType } = user
        req.data = { name, email, userType }

        if (!role.includes(userType)) return res.status(401).json({ message: "User unauthorized" })
        next()
    } catch(err) {
        return res.status(404).json({message: "No user with that id"})
    }
}

const unknownPermission = (req, res, next) => {
    if (req.cookies.jwt) return res.status(401).json({ message: "You must logout before login" })
    next()
}

module.exports = { authentification, typePermission, unknownPermission }