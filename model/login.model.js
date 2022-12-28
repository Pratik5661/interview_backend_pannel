var mongoose = require('mongoose');

let userLogin = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
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

mongoose.model('userLogin', userLogin)