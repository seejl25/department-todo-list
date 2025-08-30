const mongoose = require('mongoose')

const Schema = mongoose.Schema

const meetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    organiser: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user_code: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Meeetings', meetingSchema)