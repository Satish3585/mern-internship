const express = require('express')
const router = express.Router()

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')   // ← ADD THIS

// PUBLIC routes — anyone can view
router.get('/',     getAllProducts)
router.get('/:id',  getProductById)

// PROTECTED routes — only logged-in users
router.post('/',       protect, createProduct)    // ← added protect
router.put('/:id',     protect, updateProduct)    // ← added protect
router.patch('/:id',   protect, patchProduct)     // ← added protect
router.delete('/:id',  protect, deleteProduct)    // ← added protect

module.exports = router