const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './temp/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}_${file.originalname}`)
        }
    })
})
const verifyToken = require('../controller/verifyToken');

const userRegistration = require('../controller/user/registration');
const userLogin = require('../controller/user/login');
const verify = require('../controller/user/verify');
const getDashboard = require('../controller/dashboard');
const getUsers = require('../controller/user/list');

const scheduleInterview = require('../controller/scheduleInterview/index');
const getScheduleInteviews = require('../controller/scheduleInterview/list');


// Routes ---
router.route('/upload').post(upload.single("file"), (req, res) => {
    res.status(200).json({ status: 'success', message: 'file uploaded successfully', fileName: req.file.filename })
});

// userRegistration
router.route('/register').post(userRegistration);
// userLogin
router.route('/login').post(userLogin);
router.route('/verify').post(verify);

router.use(verifyToken);

router.route('/getdashboard/data').get(getDashboard);
router.route('/getUsers').get(getUsers);
router.route('/schedule/interview').post(scheduleInterview);
router.route('/interviews').get(getScheduleInteviews);


module.exports = router