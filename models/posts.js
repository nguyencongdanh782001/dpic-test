import mongoose from 'mongoose'
// test di nay ban coppy ko sao
const postSchema = mongoose.Schema({
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
        type: Array,
    },
    note:{
        type: String
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

const Posts = mongoose.model('posts', postSchema)

export default Posts