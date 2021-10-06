import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import photoRoutes from './routes/photos.js'
import categoryRoutes from './routes/categories.js'
import exhibitionpostRoutes from './routes/exhibitionposts.js'
import notifyRoutes from './routes/notify.js'
import exhibitionRoutes from './routes/exhibitions.js'
import advertiseRoutes from './routes/advertises.js'

dotenv.config()
const app = express()
app.use(bodyparser.json({limit:'30mb', extended: true}))
app.use(bodyparser.urlencoded({limit:'30mb', extended: true}))
app.use(cors())
app.use(express.static('uploads'))

app.use('/posts', postRoutes)
app.use('/photos', photoRoutes)
app.use('/categories', categoryRoutes)
app.use('/auth', authRoutes)
app.use('/exhibitionposts', exhibitionpostRoutes)
app.use('/notify', notifyRoutes)
app.use('/exhibition', exhibitionRoutes)
app.use('/advertises', advertiseRoutes)

// app.get('/', (req, res) => {
//     res.send('APP IS RUNNING')
// })

const PORT = process.env.PORT || 5000
const connectDB = async () => {
 try {
     await mongoose.connect(process.env.CONNECTION_URL,{
         useNewUrlParser:true,
         useUniFiedTopology:true
     })
     app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))
 } catch (error) {
     console.log(error)
 }
}
connectDB()