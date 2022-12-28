var mongoose = require('mongoose');

let registration = require('../../model/registration.model')

module.exports.userRegistration = async (req, res) => {
    try {
        const registrationData = await registration.create({
            name: req.body.name,
            mobile: req.body.mobile,
            email : req.body.email,
            password: req.body.password,
            role : req.body.role,
            isMobileVerify : req.body.isMobileVerify,
            isEmailVerify : req.body.isEmailVerify
        })
        return res 
        .status(200)
        .json({status : "success", data : registrationData})
    } catch (err) {
        return res
        .status(400)
        .json({"error" : err})
    }
}