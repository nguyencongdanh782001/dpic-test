import mongoose from 'mongoose'

const advertiseSchema = mongoose.Schema({
    name:{
        type:String
    },
    link:{
        type:String
    },
    image:{
        type:String
    }
})

const Advertises = mongoose.model('advertises', advertiseSchema)
export default Advertises