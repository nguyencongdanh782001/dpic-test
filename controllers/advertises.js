import Advertises from "../models/advertises.js";
import mongoose from 'mongoose'

export const getAdvertises = async (req, res) => {
    try {
        const advertise = await Advertises.find()
        return res.json({result: advertise})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createAdvertise = async (req, res) => {
    const advertise = req.body
    const newAdvertise = new Advertises(advertise)
    try {
        await newAdvertise.save()
        return res.json({result: newAdvertise})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateAdvertise = async (req, res) => {
    const id = req.params.id
    const advertise = req.body 

    if(!req.userId) return res.status(403).send('unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no advertise with that id')
    try {
        const updateAdvertise = await Advertises.findByIdAndUpdate({_id:id}, {...advertise, _id: id}, {new: true})
        return res.json({result: updateAdvertise})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteAdvertise = async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status.send('no advertise with that id')
    try {
        const advertise = await Advertises.findOneAndRemove({_id:id})
        return res.json({result: advertise})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}