import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import Users from '../models/users.js'
import dotenv from 'dotenv'
dotenv.config()

export const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({_id: req.userId})
        return res.json({result: user})
    } catch (error) {
        return res.status(500).json({message:'something went wrong.'})
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        const extingUser = await Users.findOne({email})
        if(!extingUser) return res.status(404).json({message:"User doesn't exsit. "})

        const isPasswordCorrect = await argon2.verify(extingUser.password, password)
        if(!isPasswordCorrect) return res.status(404).json({message:"Password word is not correct"})

        const token = jwt.sign({email: extingUser.email, id: extingUser._id},process.env.ACCESS_TOKEN_SECRET)
        
        return res.json({result: extingUser, token})
    } catch (error) {
        return res.status(500).json({message:'something went wrong.'})
    }
}

export const signup = async (req, res) => {
    const {email, firstname, lastname, password, confirmpassword, role} = req.body

    try {
        const extingUser = await Users.findOne({email})
        
        if(extingUser) return res.status(400).json({message:'user already exists'})

        if(password !== confirmpassword) return res.status(400).json({message:'password not match'})

        const hashpassword = await argon2.hash(password)
        
        const result = await Users.create({email:email, password:hashpassword, name:`${firstname} ${lastname}`, role:role})

        const token = jwt.sign({email: result.email, id: result._id},process.env.ACCESS_TOKEN_SECRET)

        return res.json({result: result , token})
    } catch (error) {
        return res.status(500).json({message:'something went wrong.'})
    }
}
