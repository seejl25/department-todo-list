const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

// GET all todo
const getTodos = async (req, res) => {
    const user_code = req.user.code

    const todos = await Todo.find({user_code}).sort({createdAt: -1})

    res.status(200).json(todos)
}

// GET indiv todo
const getTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such to-do'})
    }

    const todo = await Todo.findById(id)

    if (!todo) {
        return res.status(400).json({error: 'No such to-do'})
    }

    res.status(200).json(todo)
}

// CREATE new todo
const createTodo = async (req, res) => {
    const {title, username, due, priority, description} = req.body

    let emptyField = []

    if (!title) {
        emptyField.push('title')
    }

    if (!username) {
        emptyField.push('who')
    }

    if (!due) {
        emptyField.push('due')
    }
    if (emptyField.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyField})
    }

    try {
        const user_code = req.user.code
        const todo = await Todo.create({title, username, due, priority, description, user_code})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE to do
const deleteTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such to-do'})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if (!todo) {
        return res.status(400).json({error: 'No such to-do'})
    }

    res.status(200).json(todo)
}

module.exports = {
    getTodos,
    getTodo, 
    createTodo,
    deleteTodo
}