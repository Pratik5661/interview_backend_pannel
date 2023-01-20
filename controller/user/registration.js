let registration = require('../../model/user')
const utl = require('../../utility');
const fs = require('fs-extra')

const userRegistration = async (req, res) => {
    try {
        const checkUser = await registration.find({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
        if (checkUser.length) {
            return res
                .status(400)
                .json({ status: "error", message: 'user already registered with this email or mobile' })
        }
        if (req.body.resume) {
            await fs.move(`./temp/${req.body.resume}`, `./uploads/resume/${req.body.resume}`);
        }

        const registrationData = await registration.create({
            fullName: req.body.fullName,
            mobile: req.body.mobile,
            email: req.body.email,
            role: req.body.role,
            skills: req.body.skills,
            resume: req.body.resume,
            isMobileVerify: false,
            isEmailVerify: false,
            emailVerifyOtp: utl.generateOtp()
        })
        await registration.create(registrationData);
        return res
            .status(200)
            .json({ status: "success", otp: registrationData.emailVerifyOtp, message: 'user registered sucessfully and verification otp sent' })
    } catch (err) {
        return res
            .status(400)
            .json({ "error": err.message })
    }
}


module.exports = userRegistration;