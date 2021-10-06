import express from 'express'
import { createPhoto, getPhotos, deletePhoto, updatePhoto } from '../controllers/photos.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()
router.get('/', verifyToken, getPhotos)
router.post('/', verifyToken, createPhoto)
router.patch('/:id', verifyToken, updatePhoto)
router.delete('/:id', verifyToken, deletePhoto)

export default router