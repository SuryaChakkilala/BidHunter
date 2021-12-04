const asyncHandler = require('express-async-handler')
const { User } = require('../models/user')
const bcrypt = require('bcryptjs');
require('dotenv/config')
const { generateToken } = require('../utils/generateToken')

exports.authUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            reckz: user.reckz
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

exports.getUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            reckz: user.reckz
        })
    } else {
        res.status(404)
        throw new Error('Invalid Email or Password')
    }
})

exports.getUsers = asyncHandler(async (req, res)=>{
    const users = await User.find()

    if(users) {
        res.json(users)
    } else {
        res.status(404)
        throw new Error('Cannot GET users')
    }
})

exports.registerUser = asyncHandler(async (req,res)=>{
    
    const userExists = await User.findOne({email: req.body.email})

    if(userExists)  {
        return res.status(404)
        throw new Error('User already exists') 
    }
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
        reckz: 0
    })
    user = await user.save();

    if(!user) {
        res.status(400)
        throw new Error('User cannot be created')
    }

    res.send(user);
})

exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.reckz = req.body.reckz || user.reckz
        if(req.body.password) {
            user.passwordHash = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email, 
            isAdmin: updatedUser.isAdmin,
            reckz: updatedUser.reckz,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    
    if(user) {
        res.json({
            message: 'User deleted'
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})