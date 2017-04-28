var express = require('express');
var router = express.Router();

var user = require('./user.js');

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

router.get('/login', function(req, res, next) {
    return res.render('login', { title: 'Login' });
});

router.get('/profile', function(req, res, next) {
    // User.findById(req.session.userId)
    //     .exec(function (error, user) {
    //         if (error) {
    //             return next(error);
    //         } else {
                return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook });
            // }
        // });
});

router.post('/login', function(req, res, next) {
    if (req.body.username && req.body.password) {
        user.authUser(req.body.username, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            }  else {
                req.session.userId = user;
                return res.send(req.session.userId);
                // return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('Both Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

router.post('/register', function(req, res, next) {

    if (req.body.email && req.body.name && req.body.gender && req.body.password && req.body.confirmPassword){

        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        var name = req.body.name;
        var email = req.body.email;
        var gender = req.body.gender;
        var password = req.body.password;
        var username = req.body.username;

        console.log("New User signup reuqset from ",name);

        user.newUser(email,name,gender,username,password, function(data) {
            // res.send(data);
            console.log(data);
        });

        return res.send('Success: ');

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

});

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});

module.exports = router;

