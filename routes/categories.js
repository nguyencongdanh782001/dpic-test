import express from 'express'
import { createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categories.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()
router.get('/', verifyToken, getCategories)
router.post('/', verifyToken, createCategory)
router.patch('/:id', verifyToken, updateCategory)
router.delete('/:id', verifyToken, deleteCategory)
export default router