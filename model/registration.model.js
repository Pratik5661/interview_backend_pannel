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
    password : {
        type : String,
        required : true
    },
    select : {
        type : String,
        required : true
    }
})

mongoose.model('userRegistration', userRegistration)