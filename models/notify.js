import mongoose from 'mongoose'

const notifySchema = mongoose.Schema({
    creator:{
        type: String
    },
    name:{
        type: String
    },
    message:{
        type: String
    },
    seen:{
        type: Array,
        default: []
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const Notify = mongoose.model('notify', notifySchema)
export default Notify