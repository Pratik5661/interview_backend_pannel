const res = require('express/lib/response');
const userSchema = require('../../model/user');


const getUsers = async (req,res) => {
    try {
        const response = await userSchema.find({ role: req.query.role});
        res.status(200).json({ status: 'success', data: response });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

module.exports = getUsers;