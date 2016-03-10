// require modules
var express = require('express');
    // cors = require('cors'),
    // bodyParser = require('body-parser'),
    // cookieParser = require('cookie-parser'),
    // mongoose = require('mongoose'),
    // session = require('express-session'),
    // MongoStore = require('connect-mongo')(session),
    // passport = require('passport'),
    // logger = require('morgan'),
    // dotenv = require('dotenv').config();

// set up express & start app
var app = express();
var port = 3500;

// set up middleware
// var corsOptions = {
// 	origin: 'http://localhost' + port
// };
// // app.use(logger('dev')); // logs any request made
// app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public')); // serves up front end files

// start app listening
var server = app.listen(port, function() {
  console.log('listening on port', port);
});
