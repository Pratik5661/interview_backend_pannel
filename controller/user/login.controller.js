let mongoose = require('mongoose');
const jwt = require('jsonwebtoken')  
let loginList = mongoose.model('userLogin');

module.exports.Login = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        loginList.findOne({email : email, password : password})
        .exec(function (err, data) {
            if(err) {
                return res
                .status(400)
                .json(err)
            } else {
                if (data) {
                    const token = jwt.signJwt(data)
                    return res
                    .status(200)
                    .json({"message" : "Success login", "data" : [{email : data.email, token: token}], "code" : 1});
                } else {
                    return res
                    .status(200)
                    .json({"message": "Login Failed!", "data": [], "code": 0 })
                }
            }
        });
};