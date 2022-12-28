const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const route = require('./routes/index')
app.use(cors())

app.use(bodyParser.urlencoded({
    'extended' : true
}));

app.use(bodyParser.json())
// port is runing on 
app.use('/api',route);
app.set('port', 3004)


// Listen for requests

const server = app.listen(app.get('port'), function () {
    const port = server.address().port;
    console.log('magic happens on ' + port);
});

mongoose.connect('mongodb+srv://user:interviewPanel@cluster0.4jiauki.mongodb.net/interview_panel?retryWrites=true&w=majority',
).then(()=>{console.log('success')}).catch((err)=>{console.log(err.message)})

