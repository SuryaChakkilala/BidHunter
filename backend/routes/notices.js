const express = require('express')
const { Notice } = require('../models/notice')
const router = express.Router()
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler(async (req, res) => {
    const notice = await Notice.find()

    if(!notice) {
        res.status(404)
        throw new Error('NO NOTICES FOUND')
    }
    res.status(200).send(notice)
}))

router.get('/:id', asyncHandler(async (req, res)=>{
    const notice = await Notice.findById(req.params.id)

    if(!notice) {
        res.status(404)
        throw new Error('NO NOTICES FOUND')
    }
    res.status(200).send(notice)
}))

router.post('/', asyncHandler(async (req, res) => {
    let notice = new Notice({
        user: req.body.user,
        message: req.body.message,
        product: req.body.product
    })

    notice = await notice.save()
    if(!notice) {
        res.status(404)
        throw new Error('CANNOT POST')
    }
    res.status(200).send(notice)
}))

router.delete('/:id', asyncHandler(async (req, res)=>{
    const notice = await Notice.findByIdAndDelete(req.params.id)

    if(!notice) {
        res.status(404)
        throw new Error('CANNOT DELETE')
    }
    res.status(200).send(notice)
}))

module.exports = router