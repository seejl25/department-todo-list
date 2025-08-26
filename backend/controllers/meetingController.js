const Meeting = require('../models/meetingModel')
const mongoose = require('mongoose')

// GET all meetings
const getMeetings = async (req, res) => {
    const meetings = await Meeting.find({}).sort({createdAt: -1})

    res.status(200).json(meetings)
}

// GET indiv meeting
const getMeeting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such meeting'})
    }

    const meeting = await Meeting.findById(id)

    if (!meeting) {
        return res.status(400).json({error: 'No such meeting'})
    }

    res.status(200).json(meeting)
}

// CREATE new meeting
const createMeeting = async (req, res) => {
    const {title, organiser, date, time, duration, location, description} = req.body

    let emptyField = []

    if (!title) {
        emptyField.push('title')
    }

    if (!organiser) {
        emptyField.push('organiser')
    }

    if (!date) {
        emptyField.push('date')
    }

    if (!time) {
        emptyField.push('time')
    }

    if (!duration) {
        emptyField.push('duration')
    }

    if (!location) {
        emptyField.push('location')
    }

    if (emptyField.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyField})
    }

    try {
        const meeting = await Meeting.create({title, organiser, date, time, duration, location, description})
        res.status(200).json(meeting)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE meeting
const deleteMeeting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such meeting'})
    }

    const meeting = await Meeting.findOneAndDelete({_id: id})

    if (!meeting) {
        return res.status(400).json({error: 'No such meeting'})
    }

    res.status(200).json(meeting)
}

module.exports = {
    getMeetings,
    getMeeting,
    createMeeting, 
    deleteMeeting
}