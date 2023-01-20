const userSchema = require('../../model/user');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');
const config = require('../../config.json');

const login = async (req, res) => {
    try {
        const findUser = await userSchema.findOne({ email: req.body.email });
        if (!findUser) {
            res.status(400).json({ message: 'incorrect email or password' })
        }

        const comparePass = await bcrypt.compare(req.body.password, findUser.password);
        if (!comparePass) res.status(400).json({ message: 'incorrect email or password' });

        const token = await jsonToken.sign({ role: findUser.role, _id: findUser._id, email: findUser.email }, config.tokenSecret);

        res.status(200).json({ status: 'success', token, user: { email: findUser.email, role: findUser.role, _id: findUser._id, name: findUser.fullName } });

    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

module.exports = login;