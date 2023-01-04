const express = require('express');

const router = express.Router();


const userRegistration = require('../controller/user/registration.controller');
const userLogin = require('../controller/user/login.controller');

// Routes ---
// userRegistration
router.route('/register').post(userRegistration.userRegistration);

// userLogin
router.route('/login').post(userLogin.Login)

module.exports = router
