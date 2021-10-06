import ExhibitionPosts from "../models/exhibitionposts.js";
import mongoose from 'mongoose'
export const getExhposts = async (req, res) => {
    try {
        const exhposts = await ExhibitionPosts.find().sort({createdAt: - 1})

        return res.json({result: exhposts})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPrivateExhposts = async (req, res) => {
    try {
        const exhposts = await ExhibitionPosts.find({creator: req.userId}).sort({createdAt: - 1})

        return res.json({result: exhposts})
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

export const createExhposts = async (req, res) => {
    const exhpost = req.body
    const newExhPost = new ExhibitionPosts({...exhpost,creator: req.userId ,approve: false, createdAt: new Date().toISOString()})

    try {
        await newExhPost.save()
        return res.json({result: newExhPost})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateExhposts = async (req, res) => {
    const id = req.params.id
    const exhpost = req.body
    if(!req.userId) return res.status(403).send("Unauthenticated")

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    try {
        const updateExhPost = await ExhibitionPosts.findByIdAndUpdate({_id:id}, {...exhpost, _id:id}, { new: true })

       return res.json({result: updateExhPost})
    } catch (error) {
       return res.status(500).json({message:error.message})
    }
}

export const likeExhpost = async (req, res) => {
    const id = req.params.id

    if(!req.userId) return res.status(403).send("Unauthenticated")

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id')

    try {
        const exhpost = await ExhibitionPosts.findById({_id: id})
        const index = await exhpost.like.findIndex((id) => id === String(req.userId))

        if(index === -1){
            exhpost.like.push(req.userId)
        }else{
            exhpost.like = exhpost.like.filter(id => id !== req.userId)
        }

        const UpdateExhPost = await ExhibitionPosts.findByIdAndUpdate({_id: id}, exhpost, {new: true})
        return res.json({result: UpdateExhPost})
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

export const commentExhpost = async (req, res) => {
    const id = req.params.id
    const comment = req.body
    if(!req.userId) return res.status(403).send("Unauthenticated")

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id')

    try {
        const exhpost = await ExhibitionPosts.findById({_id: id})
        
        exhpost.comment.push(comment)
        const updateExhPost = await ExhibitionPosts.findByIdAndUpdate({_id:id}, exhpost, {new: true})

        return res.json({result: updateExhPost})
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

export const deleteExhposts = async (req, res) => {
    const id = req.params.id
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No posts with that id")

    try {
       const exhpost = await ExhibitionPosts.findOneAndRemove({_id: id})
        return res.json({result:exhpost})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

