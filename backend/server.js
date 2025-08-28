require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')
const meetingRoutes = require('./routes/meetingRoutes')
const minutesRoutes = require('./routes/minutesRoutes')
const announcementRoutes = require('./routes/announcementRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todo', todoRoutes)
app.use('/api/meeting', meetingRoutes)
app.use('/api/minutes', minutesRoutes)
app.use('/api/announcement', announcementRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT) 
        })
    })
    .catch((err) => {
        console.log(err)
    })