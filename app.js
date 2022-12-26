const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({
    'extended' : true
}));

app.use(bodyParser.json())
// port is runing on 
app.set('port', 3004)


// Listen for requests

const server = app.listen(app.get('port'), function () {
    const port = server.address().port;
    console.log('magic happens on ' + port);
})