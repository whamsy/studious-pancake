var express = require('express');
var router = express.Router();

var mid = require('../middleware');
var user = require('./user.js');

var userNEW = new user.Auth();

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});


// GET /contact
router.get('/room', function(req, res, next) {
    return res.render('userroom', { title: 'Your Room' });
});


// GET /contact
router.get('/roomsearch', function(req, res, next) {
    return res.render('roomsearch', { title: 'Room Search' });
});

// GET /contact
router.get('/room8search', function(req, res, next) {
    return res.render('room8search', { title: 'Roomie Search' });
});

router.get('/profile', mid.requiresLogin, function(req, res, next) {
    // User.findById(req.session.userId)
    //     .exec(function (error, user) {
    //         if (error) {
    //             return next(error);
    //         } else {
    // if (req.session && req.session.username) {
        return res.render('profile', { title: 'Profile', name: req.session.username, favorite: 'Goblet of Fire' });
    // }
    // }
    // });
});

// GET /
router.get('/', function(req, res, next) {
    // userNEW.getsession();
    if (req.session && req.session.username) {
        console.log("SESSION DATA ON HOME PAGE ")
        console.log(req.session);
        return res.render('loggedinhome', { title: 'Logged In Home' });
    } else {
        console.log("NO SESSION DATA YET");
        return res.render('index', { title: 'Home' });
    }
    // console.log(res.locals.currentUser);
    // return res.render('index', { title: 'Home' });

});

// GET /about
router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'About' });
});

router.get('/register', function(req, res, next) {
    console.log(req.session);
    return res.render('register', { title: 'Register' });
});

router.get('/conf', function(req, res, next) {
    console.log(req.session);
    return res.render('conf', { title: 'Confirmation' });
});

router.post('/conf', function(req, res, next) {

    userNEW.conf(req.session.username,req.body.confcode,function (error,result) {

        if (error || !result) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        }  else {

            req.session.confirmed = true;
            req.session.loggedin = true;
            console.log("SESSION DATA AFTER CONFIRMATION");
            console.log(req.session);

            return res.redirect('/profile');

            // return res.render('profile', { title: 'Profile', name: req.session.username, favorite: 'Goblet of Fire' });

        }
    })

    // console.log(req.body.confcode);

    // return res.redirect('/');
    // return res.send(req.session.username);
    // return res.render('conf', { title: 'Confirmation' });
});

router.get('/login', mid.loggedOut, function(req, res, next) {
    return res.render('login', { title: 'Login' });
});



router.post('/login', function(req, res, next) {
    if (req.body.username && req.body.password) {
        userNEW.authUser(req.body.username, req.body.password, function (error, result) {
            if (error || !result) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            }  else {

                req.session.username = req.body.username;
                req.session.confirmed = true;
                req.session.loggedin = true;
                req.session.registered = true;

                // req.session.user = result.userdata;

                // console.log("DATA",);
                console.log("SESSION DATA AFTER LOGIN");
                // userNEW.getsession();
                console.log(req.session);
                // console.log("\n\n\n GET SESSION OUTPUT:\n",userNEW.getsession());
                // localStorage.setItem('userid',username);

                return res.redirect('/profile');

                // return res.render('profile', { title: 'Profile', name: req.session.username, favorite: 'Goblet of Fire' });

            }
        });
    } else {

        var err = new Error('Both Email and password are required.');
        err.status = 401;
        return next(err);

    }
});

router.post('/register', mid.loggedOut, function(req, res, next) {

    if (req.body.email && req.body.name && req.body.gender && req.body.password && req.body.confirmPassword){

        var userData = {
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            password: req.body.password
        };

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

        console.log("New User signup request from ",name);

        userNEW.newUser(email,name,gender,username,password, function(data) {
            // res.send(data);
            // req.session.username = username;

            console.log('DATA?'+data);
            console.log(req.session);
        });

        req.session.username = req.body.username;
        req.session.registered = true;
        console.log("SESSION DATA AFTER REGISTRATION");
        console.log(req.session);

        return res.render('conf', { title: 'Confirmation' });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});



module.exports = router;

