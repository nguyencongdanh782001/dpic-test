import express from 'express'
import { createPost, getBySearchPosts, getPosts, likePost, commentPost, getLibPosts, deletePost, updatePost } from '../controllers/posts.js'
import verifyToken from '../middleware/auth.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })
const router = express.Router()

router.get('/', getPosts)
router.get('/search', getBySearchPosts)
router.post('/', verifyToken, upload.array('image', 12), createPost)
router.patch('/:id/likepost', verifyToken, likePost)
router.post('/:id/commentpost', verifyToken, commentPost)
router.patch('/:id', verifyToken, updatePost)
router.delete('/:id', verifyToken, deletePost)

router.get('/libposts', verifyToken, getLibPosts)

export default router