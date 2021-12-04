const asyncHandler = require('express-async-handler')
const { Product } = require('../models/product')

exports.getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {  }

    const productList = await Product.find({...keyword})

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

exports.updatePriceById = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        price: req.body.price
    })

    if(!product) {
        res.status(404)
        throw new Error('Cannot Update')
    }
    res.json(product)
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if(product){
        res.json({message: 'Product deleted successfully'})
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        currentHolder: req.user._id
      })
    
      const createdProduct = await product.save()
      res.status(201).json(createdProduct)
})

exports.updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
      product.currentHolder = req.user
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })