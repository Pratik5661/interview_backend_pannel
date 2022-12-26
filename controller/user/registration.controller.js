var mongoose = require('mongoose');

let registration = mongoose.model('userRegistration');

module.exports.userRegistration = async (req, res) => {
    try {
        const registrationData = await registration.create({
            name: req.body.name,
            mobile: req.body.mobile,
            password: req.body.password,
            select : req.body.select
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