const express = require('express');

const router = express.Router();


const userRegistration = require('../controller/user/registration.controller');




// Routes ---
// userRegistration
router
.route('/registration')
.post(userRegistration.userRegistration);