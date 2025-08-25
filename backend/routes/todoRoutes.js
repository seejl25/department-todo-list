const express = require('express')

const router = express.Router()

const {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo
} = require('../controllers/todoController')

// GET all to dos
router.get('/', getTodos)

// GET individual to do
router.get('/:id', getTodo)

// POST a new to do
router.post('/', createTodo)

// DELETE a to do
router.delete('/:id', deleteTodo)

module.exports = router