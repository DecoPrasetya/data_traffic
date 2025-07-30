import express from 'express'
import {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
} from '../controller/productsController.js'
import { verifyUser } from '../middleware/authUser.js'

const router = express.Router()

router.get('/products', verifyUser, getProducts)
router.get('/products/:id', verifyUser, getProductById)
router.post('/products', verifyUser, createProduct)
router.patch('/products/:id', verifyUser, editProduct)
router.delete('/products/:id', verifyUser, deleteProduct)

export default router