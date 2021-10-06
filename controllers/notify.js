import Notify from "../models/notify.js";
import mongoose from 'mongoose'

export const getNotify = async (req, res) => {
    try {
        const notify = await Notify.find().sort({createdAt: - 1})
        return res.json({result: notify})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createNotify = async (req, res) => {
    const notify = req.body
    const newNotify = new Notify({...notify, creator: req.userId, createAt:new Date().toISOString()})
    try {
        await newNotify.save()
        return res.json({result: newNotify})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateNotify = async (req, res) => {
    const id = req.params.id
    const notify = req.body 

    if(!req.userId) return res.status(403).send('unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no notify with that id')
    try {
        const updateNotify = await Notify.findByIdAndUpdate({_id:id}, {...notify, _id: id}, {new: true})
        return res.json({result: updateNotify})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const seenNotify = async (req, res) => {
    const id = req.params.id

    if(!req.userId) return res.status(403).send('unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no notify with that id')
    try {
        const notify = await Notify.findById({_id:id})
        const index = await notify.seen.findIndex(id => id === String(req.userId))
        if(index === -1 ){
            notify.seen.push(req.userId)
        }
        const updateNotify = await Notify.findByIdAndUpdate({_id:id}, notify , {new: true})
        return res.json({result: updateNotify})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteNotify = async (req, res) => {
    const id = req.params.id
    
    if(!req.userId) return res.status(403).send('unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status.send('no notify with that id')
    try {
        const notify = await Notify.findOneAndRemove({_id:id})
        return res.json({result: notify})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}