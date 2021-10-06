import Categories from "../models/categories.js";
import mongoose from 'mongoose'
export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find({creator: req.userId}).sort({createdAt: -1})

        return res.json({result: categories})
    } catch (error) {
        return res.status(500).send('server error')
    }
}

export const createCategory = async (req, res) => {
    const category = req.body

    const newCategory = new Categories({...category, creator: req.userId, createAt: new Date().toISOString()})
    try {
        await newCategory.save()
        return res.json({result: newCategory})
    } catch (error) {
        return res.status(500).send('server error')
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.params.id

    if(!req.userId) return res.status(403).send('Unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no category with that id')
    try {
        const category = await Categories.findByIdAndRemove({_id:id})
        return res.json({result: category})
    } catch (error) {
        return res.status(500).send('server error')
    }
}

export const updateCategory = async (req, res) => {
    const id = req.params.id
    const category = req.body
    if(!req.userId) return res.status(403).send('Unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no category with that id')
    try {
        const updateCategory = await Categories.findByIdAndUpdate({_id:id}, {...category, _id:id}, {new: true})
        return res.json({result: updateCategory})
    } catch (error) {
        return res.status(500).send('server error')
    }
}