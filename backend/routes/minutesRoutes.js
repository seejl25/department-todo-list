const express = require('express')
const router = express.Router()

const {
    getMinutes,
    getMinute,
    createMinutes,
    deleteMinutes
} = require('../controllers/minutesController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// GET all minutes
router.get('/', getMinutes)

// GET indiv minutes
router.get('/:id', getMinute)

// POST new minutes
router.post('/', createMinutes)

// DELETE minutes
router.delete('/:id', deleteMinutes)

module.exports = router