var mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
        email : {
            type: String,
            required: true
        }, 
        password : {
            type: String,
            required: true
        },
        role : {
            type: String,
            enum : ["employee", "admin", "customer"],
            default: "customer"
        },
        createBy : {
            type: String,
            required: false
        },
        createdAt : {
            type : Date,
            required : false,
            default : Date.now()
        },
        updatedAt : {
            type: Date,
            required : false,
            default : Date.now()
        }
})

mongoose.model('user', userSchema)