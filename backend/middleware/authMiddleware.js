const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const asyncHandler = require('express-async-handler')

exports.protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split('Bearer ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-passwordHash')

            console.log(decoded)

            next()
        } catch(err) {
                res.status(401)
                throw new Error('Not authorized, token failed')
        }
    }
})

exports.admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an Admin')
    }
}