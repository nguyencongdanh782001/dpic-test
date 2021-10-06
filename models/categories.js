import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    creator:{
        type: String
    },
    name:{
        type: String
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

const Categories = mongoose.model('categories', categorySchema)

export default Categories