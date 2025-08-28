const express = require('express')

const router = express.Router()

const {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    deleteAnnouncement
} = require('../controllers/announcementController')

// GET all announcements
router.get('/', getAnnouncements)

// GET individual announcement
router.get('/:id', getAnnouncement)

// POST a new announcement
router.post('/', createAnnouncement)

// DELETE an announcement
router.delete('/:id', deleteAnnouncement)

module.exports = router