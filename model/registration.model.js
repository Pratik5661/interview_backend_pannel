var mongoose = require('mongoose');

let userRegistration = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    isEmailVerify : {
        type : Boolean,
        default: false
    },
    isMobileVerify : {
        type : Boolean,
        default: false
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : false,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        required : false,
        default : Date.now()
    }
})



module.exports = mongoose.model('userRegistration', userRegistration)