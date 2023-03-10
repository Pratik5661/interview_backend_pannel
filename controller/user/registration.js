let registration = require('../../model/user')
const utl = require('../../utility');
const fs = require('fs-extra')
const bcrypt = require('bcrypt');

const userRegistration = async (req, res) => {
    try {
        let hashPass = '';
        const checkUser = await registration.find({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });

        if (checkUser.length) {
            return res
                .status(400)
                .json({ status: "error", message: 'user already registered with this email or mobile' })
        }
        if (req.body.resume) {
            await fs.move(`./temp/${req.body.resume}`, `./uploads/resume/${req.body.resume}`);
        }
        if(req.body.password){
            hashPass = await bcrypt.hash(req.body.password, 10);
        }

        const registrationData = await registration.create({
            fullName: req.body.fullName,
            mobile: req.body.mobile,
            email: req.body.email,
            role: req.body.role,
            skills: req.body.skills,
            resume: req.body.resume,
            isMobileVerify: false,
            isEmailVerify: req.body.isEmailVerify || false,
            emailVerifyOtp: utl.generateOtp(),
            password: hashPass || ''
        })
        await registration.create(registrationData);
        return res
            .status(200)
            .json({ status: "success", otp: registrationData.emailVerifyOtp, message: req.body.isEmailVerify ? 'user is registered successfully' : 'user registered sucessfully and verification otp sent' })
    } catch (err) {
        return res
            .status(400)
            .json({ "error": err.message })
    }
}


module.exports = userRegistration;