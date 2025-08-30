const express = require('express')
const router = express.Router()

const {
    getMeetings,
    getMeeting,
    createMeeting,
    deleteMeeting
} = require('../controllers/meetingController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// GET all meetings
router.get('/', getMeetings)

// GET indiv meetings
router.get('/:id', getMeeting)

// POST a new meeting
router.post('/', createMeeting)

// DELETE a meeting
router.delete('/:id', deleteMeeting)

module.exports = router