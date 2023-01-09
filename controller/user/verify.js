const userSchema = require('../../model/user');
const bcrypt = require('bcrypt');

const verifyEmail = async (req, res) => {
    try {
        const findUser = await userSchema.findOne({ email: req.body.email, emailVerifyOtp: req.body.emailVerifyOtp });
        if (!findUser) {
            return res.status(400).json({ message: 'incorrect otp' })
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);

        const payload = {
            isEmailVerify: true,
            password: hashPass
        }
        const response = await userSchema.updateOne({ email: req.body.email }, payload);
        if (response.modifiedCount) {
            res.status(200).json({ status: 'success', message: 'otp verified successfully' })
        } else {
            res.status(201).json({ message: 'otp already verified' })
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

module.exports = verifyEmail;