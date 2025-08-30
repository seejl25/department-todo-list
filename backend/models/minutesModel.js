const mongoose = require('mongoose')

const Schema = mongoose.Schema

const minutesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    writer: {
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
    notes: {
        type: String,
        required: true
    },
    user_code: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Minutes', minutesSchema)