// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;

var express = require('express');
var router = express.Router();

var addUser = require('./userauth.js');

// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'About' });
});

router.get('/register', function(req, res, next) {
    return res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {

    var name = req.body.name;
    var email = req.body.email;
    var gender = req.body.gender;
    var password = req.body.password;
    var username = req.body.username;


    console.log("New User signup reuqset from ",name);
    //
    addUser.newUser(email,name,gender,username,password, function(data) {

        // res.send(data);
        console.log(data);
    });

    // console.log(req.body.name);
    return res.send('User data: ');
});

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});

module.exports = router;

