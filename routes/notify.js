import express from 'express'
import verifyToken from '../middleware/auth.js'
import {createNotify, deleteNotify, getNotify, updateNotify, seenNotify} from '../controllers/notify.js'
const router = express.Router()

router.get('/', getNotify)
router.post('/', verifyToken, createNotify)
router.patch('/:id', verifyToken, updateNotify)
router.patch('/:id/seen', verifyToken, seenNotify)
router.delete('/:id', verifyToken, deleteNotify)

export default router