var mongoose = require('mongoose');

let userRegistration = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isEmailVerify: {
        type: Boolean,
        default: false
    },
    isMobileVerify: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    emailVerifyOtp: Number,
    profileStatus: {
        type: 'string',
        default: 'incomplete'
    },
    skills: [],
    resume: {
        type: String
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now()
    }
})



module.exports = mongoose.model('user', userRegistration, 'user')