const asyncHandler = require('express-async-handler')
const { Product } = require('../models/product')

exports.getProducts = asyncHandler(async (req, res) => {
    const productList = await Product.find()

        /*
        //--TESTING ERROR DISPLAY
        res.status(404) //unauthorized
        throw new Error('Not authorized')
        */

    if(!productList) return res.status(404).json({success: false})
    res.status(201).send(productList)
})

exports.getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) return res.status(404).json({success: false})
    res.status(200).send(product)
})