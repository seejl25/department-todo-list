const express = require('express')

const router = express.Router()

const {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo
} = require('../controllers/todoController')

const requireAuth = require('../middleware/requireAuth')

// require auth for all routes
router.use(requireAuth)

// GET all to dos
router.get('/', getTodos)

// GET individual to do
router.get('/:id', getTodo)

// POST a new to do
router.post('/', createTodo)

// DELETE a to do
router.delete('/:id', deleteTodo)

module.exports = router