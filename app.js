var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

var AWS = require('aws-sdk');
var config = {"endpoint":"http://localhost:8000"};
var client = new AWS.DynamoDB(config);

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

app.use(session({
    secret: 'Room8Karma rocks',
    resave: true,
    saveUninitialized: false
    // store: new MongoStore({
    //     mongooseConnection: db
    // })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// listen on port 3000
app.listen(3000, function () {
    console.log('Express app listening on port 3000');
    // console.log(client);
    console.log(CognitoUserPool);
    // console.log(session);
});