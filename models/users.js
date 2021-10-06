import mongoose from 'mongoose'

const usersSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    role:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model('users', usersSchema)
export default Users