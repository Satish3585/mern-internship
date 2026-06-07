const Product = require('../models/Product')
const CustomError = require('../middleware/customError')

// GET all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    next(error)
  }
}

// GET single product
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return next(new CustomError('Product not found', 404))
    }

    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// POST create product
const createProduct = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(new CustomError('Request body is empty', 400))
    }

    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// PUT update product
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!product) {
      return next(new CustomError('Product not found', 404))
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// PATCH partial update
const patchProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )

    if (!product) {
      return next(new CustomError('Product not found', 404))
    }

    res.status(200).json({
      success: true,
      message: 'Product partially updated',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// DELETE product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return next(new CustomError('Product not found', 404))
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
}