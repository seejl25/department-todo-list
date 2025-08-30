const mongoose = require('mongoose')

const Schema = mongoose.Schema

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_code: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Announcements', announcementSchema)