const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password, code) {

    const domain = "company.com"

    // validation
    if (!email || !password || !code) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email) || 
        !email.toLowerCase().endsWith(`@${domain.toLowerCase()}`)
    ) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    const dept = ['ENG3918', 'BIZ1210', 'TECH8769', 'OPS8656', 'FIN5208']

    if (exists) {
        throw Error('Email is already in use')
    }

    if (!dept.includes(code)) {
        throw Error('Invalid code')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, code})

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)