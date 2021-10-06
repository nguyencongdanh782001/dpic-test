import mongoose from 'mongoose'

const exhibitionpostSchema = mongoose.Schema({
    name:{
        type:String
    },
    creator:{
        type:String
    },
    title:{
        type:String, 
    },
    camera:{
        type:String,
    },
    image:{
        type: String,
    },
    note:{
        type: String
    },
    approve:{
        type: Boolean
    },
    like:{
        type: Array,
        default: []
    },
    comment:{
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const ExhibitionPosts = mongoose.model('exhibitionposts', exhibitionpostSchema)

export default ExhibitionPosts