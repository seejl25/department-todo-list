const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    due: {
        type: String,
        required: true
    },
    priority: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('To-do', todoSchema)