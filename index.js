const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const http = require('http').Server(app);

const socketIO = require('socket.io');
const fileUpload = require('express-fileupload');
const cors = require('cors');

app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

//connect mongodb
mongoose.connect("mongodb://scores:scores250@ds251889.mlab.com:51889/heroku_kv76gsfx");
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//initialise routes
app.use("/api", require("./controllers/LoginController"));
app.use("/api", require("./controllers/RegisterController"));
app.use("/api", require("./controllers/CreditScoresController"));

//error handling
app.use(function (err, req, res, next) {
    res.status(400).json(err.message)
})

//port
app.set('port', Number(process.env.PORT || 3000));

const server = app.listen(app.get('port'), function () {
    console.log('Listening on ' + app.get('port'));
});

// socket connection
const io = socketIO(server);

// socket connection
io.on('connection', function(socket){
    console.log('a user connected', socket.id);

    socket.on("reloadScores", function () {
        console.log("reloadScores")
        io.sockets.emit("reloadScores");
    });
});