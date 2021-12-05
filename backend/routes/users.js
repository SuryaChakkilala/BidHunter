const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userControllers')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/')

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.get(`/get/count`, asyncHandler(async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
}))

router.get('/reckz/:id', asyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id)
    if(user) {
        res.json({
            reckz: user.reckz
        })
    } else {
        res.status(401)
        return new Error('Cannot find user')
    }
}))

router.put('/reckz/:id', asyncHandler(async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, {
        reckz: req.body.reckz
    }, {new: true})

    if(user) {
        res.json({
            reckz: user.reckz
        })
    } else {
        res.status(401)
        return new Error('Cannot find user')
    }
}))

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)


module.exports = router;