import mongoose from 'mongoose'

const exhibitionSchema = mongoose.Schema({
    title:{
        type: String
    },
    daystart:{
        type: Date
    },
    dayend:{
        type: Date
    }
})

const Exhibitions = mongoose.model('exhibitions', exhibitionSchema)
export default Exhibitions