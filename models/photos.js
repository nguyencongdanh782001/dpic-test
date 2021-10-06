import mongoose from 'mongoose'

const photoSchema = mongoose.Schema({
    creator:{
        type: String
    },
    title:{
        type: String
    },
    note:{
        type: String
    },
    category:{
        type: String
    },
    image:{
        type: String
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

const Photos = mongoose.model('photos', photoSchema)

export default Photos