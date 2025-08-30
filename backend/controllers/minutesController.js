const Minutes = require('../models/minutesModel')
const mongoose = require('mongoose')

// GET all minutes
const getMinutes = async (req, res) => {
    const user_code = req.user.code
    const minutes = await Minutes.find({user_code}).sort({createdAt: -1})

    res.status(200).json(minutes)
}

// GET indiv minutes
const getMinute = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such minutes'})
    }

    const minute = await Minutes.findById(id)

    if (!minute) {
        return res.status(400).json({error: 'No such minutes'})
    }

    res.status(200).json(minute)
}

// CREATE new minutes
const createMinutes = async (req, res) => {
    const {title, writer, date, time, notes} = req.body

    let emptyField = []

    if (!title) {
        emptyField.push('title')
    }

    if (!writer) {
        emptyField.push('writer')
    }

    if (!date) {
        emptyField.push('date')
    }

    if (!time) {
        emptyField.push('time')
    }

    if (!notes) {
        emptyField.push('notes')
    }

    if (emptyField.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyField})
    }

    try {
        const user_code = req.user.code
        const minutes = await Minutes.create({title, writer, date, time, notes, user_code})
        res.status(200).json(minutes)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE minutes
const deleteMinutes = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such minutes'})
    }

    const minutes = await Minutes.findOneAndDelete({_id: id})

    if (!minutes) {
        return res.status(400).json({error: 'No such minutes'})
    }

    res.status(200).json(minutes)
}

module.exports = {
    getMinutes,
    getMinute,
    createMinutes, 
    deleteMinutes
}