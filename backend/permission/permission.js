const router = require("express").Router()
const mongoose = require("mongoose")
const userModel = require("../Models/users");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const Role = {
    student: "Student",
    manager: "Manager",
    extern: "Extern",
    member: "Member",
}

function authentification(req, res, next) {
    const cookie = req.cookies.jwt
    if (!cookie) return res.status(401).json({ message: "Unauthenticated" })

    const data = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET)

    if (!data) return res.status(401).json({ message: "Unauthenticated" })
    
    req.user = data._id

    next()
}

const typePermission = (role) => async (req, res, next) => {
    user = await userModel.findById(req.user)
    const {name, email, userType} = user
    req.data = {name, email, userType}

    if (!role.includes(userType)) return res.status(401).json({message: "User unauthorized"})
    next()
}

const unknownPermission = (req, res, next) => {
    if (req.cookies.jwt)  return res.status(401).json({message: "You must logout before login"}) 
    next()
}

module.exports = {authentification, typePermission, Role, unknownPermission}