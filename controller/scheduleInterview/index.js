const scheduleInterviewSchema = require('../../model/scheduleInterview');
const userSchema = require('../../model/user');
const nodemailer = require('nodemailer');
const config = require('../../config.json');
const moment = require('moment');
const { google } = require('googleapis');

// const eventId = "<yourEventId>";
// const calendarId = "<yourCalendarId>";

// const calendar = google.calendar({
//     version : "v3",
//     auth : auth
// });

const scheduleInterview = async (req, res) => {
    try {
        const findUsers = await userSchema.find({ _id: { $in: [req.body.interviewer, req.body.candidate] } });
        if (findUsers.length < 2) {
            res.status(400).json({ success: false, message: 'unable to find developer or interviewer' })
        }
        const response = await scheduleInterviewSchema.create(req.body);
        
        if (response) {
            await setEmail(req, findUsers);
            res.status(200).json({ success: true, message: 'interview scheduled successfully' });
        } else {
            res.status(200).json({ success: false, message: 'unable to schedule interview' })
        }
    } catch (err) {
        return res
            .status(400)
            .json({ "error": err.message })
    }
}

const setEmail = async (req, users) => {
    try {

        const findDeveloper = users.filter(data => data.role === 'Developer')[0];
        const findInterviewer = users.filter(data => data.role === 'Interviewer')[0];
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });

        const mailOptions = {
            from: config.email,
            to: findDeveloper.email,
            subject: 'Sending Email using Node.js',
            html: `<h2>Interview Scheduled</h2> </br></br>
                Dear <b>${findDeveloper.fullName.toProperCase()}</b> <br><br>
                Thank you for your application on Interview panel.
                <br><br>
                We reviewed your application and we would to accelerate you to the next step of the next step of the interview process.
                Your interview with <b>${findInterviewer.fullName.toProperCase()}</b> for ${req.body.skills.join(', ')} developer has been scheduled.
                <br><br>
                <b>Interview Date: <b> ${moment(req.body.scheduleDate).format('DD/MM/YYYY')} <br>
                <b>Start Time: </b>${req.body.startTime}<br>
                <b>Duration: </b>${req.body.duration}<br>
                <b>Interview Type: </b>${req.body.interviewType}<br>
                <b>Link: </b>'__'
            `,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log(response, 'response')

    } catch (err) {
        throw err;
    }
}


module.exports = scheduleInterview;