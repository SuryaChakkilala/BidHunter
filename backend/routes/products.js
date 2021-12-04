const express = require('express')
const {Product} = require('../models/product')
const asyncHandler = require('express-async-handler')
const { getProducts, getProductsById } = require('../controllers/productController')

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductsById)

router.post('/', asyncHandler(async (req, res) => {
    let product = new Product({
        user: req.body.user,
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: 0,
        price: req.body.price,
        countInStock: req.body.countInStock,
        currentHolder: req.body.user
    })

    product = await product.save()

    if(!product){ 
        res.status(404)
        return new Error('Cannot POST')
    }
    res.status(201).send(product)
}))

router.delete('/:id', asyncHandler(async (req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product) return res.status(404).json({success: false})
    res.status(201).send(product)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: 0,
        price: req.body.price,
        countInStock: req.body.countInStock,
        currentHolder: req.body.currentHolder
    })

    if(!product) {
        res.status(404)
        return new Error('CANNOT PUT')
    }
    res.status(200).send(product)
}))

module.exports = router