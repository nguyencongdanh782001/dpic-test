import express from 'express'
import { getExhposts, getPrivateExhposts, createExhposts, updateExhposts, likeExhpost, commentExhpost, deleteExhposts } from '../controllers/exhibitionposts.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getExhposts)
router.get('/private', verifyToken, getPrivateExhposts)
router.post('/', verifyToken, createExhposts)
router.patch('/:id', verifyToken, updateExhposts)
router.patch('/:id/likepost', verifyToken, likeExhpost)
router.post('/:id/comment', verifyToken, commentExhpost)
router.delete('/:id', verifyToken, deleteExhposts)

export default router