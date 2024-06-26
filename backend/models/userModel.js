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
    }
})

userSchema.statics.signup = async function (email, password) {
    // Validate 
    if (!email || !password) {
        throw new Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough')
    }
    const exists = await this.findOne({ email })
    if (exists) {
        throw new Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hashedPassword })
    return user
}

// static method to login user
userSchema.statics.login = async function (email, password) {
    // Validate
    if (!email || !password) {
        throw new Error('All fields are required')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw new Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Wrong password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
