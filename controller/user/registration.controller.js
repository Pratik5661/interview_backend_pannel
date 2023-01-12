let registration = require('../../model/registration.model')
const utl  = require('../../utility');

module.exports.userRegistration = async (req, res) => {
    try {
        const checkUser = await registration.find({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
        if (checkUser.length) {
            return res
                .status(400)
                .json({ status: "error", message: 'user already registered with this email or mobile' })
        }
        const registrationData = await registration.create({
            fullName: req.body.fullName,
            mobile: req.body.mobile,
            email: req.body.email,
            role: req.body.role,
            skills:req.body.skills,
            resume:'',
            isMobileVerify: false,
            isEmailVerify: false
        })
        await registration.create(registrationData);
        return res
            .status(200)
            .json({ status: "success", otp:  utl.generateOtp(), message:'user registered sucessfully and verification otp sent'})
    } catch (err) {
        return res
            .status(400)
            .json({ "error": err.message })
    }
}