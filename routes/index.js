const express = require('express');

const router = express.Router();


const userRegistration = require('../controller/user/registration.controller');
const userLogin = require('../controller/user/login');
const verify = require('../controller/user/verify');

// Routes ---
// userRegistration
router.route('/register').post(userRegistration.userRegistration);

// userLogin
router.route('/login').post(userLogin);
router.route('/verify').post(verify)

module.exports = router