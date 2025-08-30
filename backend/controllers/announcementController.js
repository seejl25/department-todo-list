const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')

// GET all announcements
const getAnnouncements = async (req, res) => {
    const user_code = req.user.code
    const announcements = await Announcement.find({user_code}).sort({createdAt: -1})

    res.status(200).json(announcements)
}

// GET indiv meeting
const getAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such announcement'})
    }

    const announcement = await Announcement.findById(id)

    if (!announcement) {
        return res.status(400).json({error: 'No such announcement'})
    }

    res.status(200).json(announcement)
}

// CREATE new meeting
const createAnnouncement = async (req, res) => {
    const {title, description} = req.body

    let emptyField = []

    if (!title) {
        emptyField.push('title')
    }

    if (!description) {
        emptyField.push('description')
    }

    if (emptyField.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyField})
    }

    try {
        const user_code = req.user.code
        const announcement = await Announcement.create({title, description, user_code})
        res.status(200).json(announcement)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE meeting
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such announcement'})
    }

    const announcement = await Announcement.findOneAndDelete({_id: id})

    if (!announcement) {
        return res.status(400).json({error: 'No such announcement'})
    }

    res.status(200).json(announcement)
}

module.exports = {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    deleteAnnouncement
}