import express from 'express'
import { createExhibition, deleteExhibition, getExhibition, updateExhibition } from '../controllers/exhibitions.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', getExhibition)
router.post('/', verifyToken, createExhibition)
router.patch('/:id', verifyToken, updateExhibition)
router.delete('/:id', verifyToken, deleteExhibition)

export default router