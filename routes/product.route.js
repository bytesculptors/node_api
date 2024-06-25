const express = require('express')
const router = express.Router()
const Product = require('../models/product.model')
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/product.controller')

router.get('/:id', getProductById)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)
router.post('/', createProduct)
router.get('/', getAllProducts)
module.exports = router