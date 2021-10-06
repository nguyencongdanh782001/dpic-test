import Photos from "../models/photos.js";
import mongoose from 'mongoose'

export const getPhotos = async (req, res) => {
    try {
       const photos = await Photos.find({creator: req.userId}).sort({createdAt: - 1})
       return res.json({result: photos})
    } catch (error) {
        return res.status(500).send('server error')
    }
}

export const createPhoto = async (req, res) => {
    const photo = req.body
   
    const newPhoto = new Photos({...photo, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPhoto.save()
        return res.json({result: newPhoto})
    } catch (error) {
        return res.status(500).send('server error')
    }
}

export const deletePhoto = async (req, res) => {
    const id = req.params.id 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('dont have post with that id')
    try {
        const photo = await Photos.findByIdAndRemove({_id:id})
        return res.json({result: photo})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updatePhoto = async (req, res) => {
    const id = req.params.id 
    const photo = req.body

    if(!req.userId) return res.status(403).send('Unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('dont have post with that id')
    try {
        const updatePhoto = await Photos.findByIdAndUpdate({_id:id},{...photo, _id:id}, {new: true} )
        return res.json({result: updatePhoto})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}