import Exhibitions from "../models/exhibition.js";
import mongoose from 'mongoose'

export const getExhibition = async (req, res) => {
    try {
        const exhibition = await Exhibitions.find()
        return res.json({result: exhibition})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createExhibition = async (req, res) => {
    const exhibition = req.body
    const newExhibition = new Exhibitions(exhibition)
    try {
        await newExhibition.save()
        return res.json({result: newExhibition})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateExhibition = async (req, res) => {
    const id = req.params.id
    const exhibition = req.body 

    if(!req.userId) return res.status(403).send('unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no exhibition with that id')
    try {
        const updateExhibition = await Exhibitions.findByIdAndUpdate({_id:id}, {...exhibition, _id: id}, {new: true})
        return res.json({result: updateExhibition})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteExhibition = async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status.send('no exhibition with that id')
    try {
        const exhibition = await Exhibitions.findOneAndRemove({_id:id})
        return res.json({result: exhibition})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}