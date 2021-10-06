import express from 'express'
import { createAdvertise, deleteAdvertise, getAdvertises, updateAdvertise } from '../controllers/advertises.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAdvertises)
router.post('/', verifyToken, createAdvertise)
router.patch('/:id', verifyToken, updateAdvertise)
router.delete('/:id', verifyToken, deleteAdvertise)

export default router