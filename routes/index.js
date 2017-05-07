var express = require('express');
var router = express.Router();

var mid = require('../middleware');
var user = require('./user.js');
var database = require('./dynamodb.js');

var userNEW = new user.Auth();
var dbops = new database.dbfunc();

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});


// GET /contact
router.get('/room', function(req, res, next) {

        dbops.getuserdetails(req.session.username,function (error,result) {

            if (error || !result) {
                var err = new Error('Sorry, could not get your data at the moment');
                err.status = 401;
                return next(err);
            }  else {

               if(result['currRoom'] != null){

                    dbops.getroomdetails(result['currRoom'],function (error1,result1) {

                        if (error1 || !result1) {
                            var err = new Error('Sorry, could not get your data at the moment');
                            err.status = 401;
                            return next(err);
                        }  else {

                            return res.render('userroom', { title: 'Your Room', username: req.session.username, roomname:result1["roomname"] ,address:result1["address"] ,users:result1["Users"], room_available:result1["Room_Available"] ,info:result1["info"] , numrooms:result1["numrooms"] ,rent:result1["rent"] , ac:result1["airconditioner"] , wifi:result1["internet"] , washer:result1["washer"] , dryer:result1["dryer"] ,parking:result1["parking"] , gym:result1["gym"] ,pool:result1["pool"] , pets:result1["pets"] });

                        }

                    })
               } else{
                   return res.render('userroom_new', { title: 'New Room Registration' });
               }


            }

        })


});


// GET /contact
router.get('/roomsearch', function(req, res, next) {
    return res.render('roomsearch', { title: 'Room Search' });
});

// GET /contact
router.get('/room8search', function(req, res, next) {
    return res.render('room8search', { title: 'Roomie Search' });
});

router.get('/preferences', function(req, res, next) {
    return res.render('preferences', { title: 'Preferences' });
});


router.get('/profile', mid.requiresLogin, function(req, res, next) {
    // User.findById(req.session.userId)
    //     .exec(function (error, user) {
    //         if (error) {
    //             return next(error);
    //         } else {
    if (req.session && req.session.username &&req.session.loggedin) {
        dbops.getuserdetails(req.session.username,function (error,result) {

            if (error || !result) {
                var err = new Error('Sorry, could not get your data at the moment');
                err.status = 401;
                return next(err);
            }  else {

                console.log(result);
                return res.render('profile', { title: 'Profile', name: result['Name'], rating: result['Rating'], cleanliness: result['Preferences']['cleanliness'], smoking: result['Preferences']['smoking'], drinking: result['Preferences']['drinking'], party: result['Preferences']['party'] });

            }

        })
    }
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

router.post('/preferences', function(req, res, next) {

    preference_list = {
        "cleanliness": req.body.cleanliness,
        "smoking": req.body.smoking,
        "drinking": req.body.drinking,
        "party": req.body.party
    }

    dbops.UpdateUserTable(req.session.username,"Preferences",preference_list, function(error1,result1){

        if (error1 || !result1) {
            console.log('ERROR IN UPDATING PREFERENCES: \n',error1);
        } else {
            console.log('RESULT OF UPDATING PREFERENCES: \n',result1);
            console.log("REDIRECTING TO PROFILE PAGE");
            return res.redirect('/profile');
        }

    });

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

            console.log("REDIRECTING TO PREFERENCES PAGE");

            return res.redirect('/preferences');

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

router.post('/newroom', function (req,res,next) {

    if(req.body.roomname && req.body.address && req.body.rent && req.body.room_available && req.body.numrooms && req.body.shared_room && req.body.pet_friendly){

        var creator = req.session.username;

        console.log("New Room creation request from ",creator);

        var room_availablity,ac,internet,washer,dryer,parking,gym,pool,shared_room,pet_friendly;

        if(req.body.room_available == 'yes'){
            room_availablity = true;
        } else {
            room_availablity = false;
        }

        if(req.body.airconditioner == 'yes'){
            ac = true;
        } else {
            ac = false;
        }

        if(req.body.internet == 'yes'){
            internet = true;
        }else {
            internet = false;
        }

        if(req.body.washer == 'yes'){
            washer = true;
        }else {
            washer = false;
        }

        if(req.body.dryer == 'yes'){
            dryer = true;
        }else {
            dryer = false;
        }

        if(req.body.parking == 'yes'){
            parking = true;
        }else {
            parking = false;
        }

        if(req.body.gym == 'yes'){
            gym = true;
        }else {
            gym = false;
        }

        if(req.body.pool == 'yes'){
            pool = true;
        }else {
            pool = false;
        }

        if(req.body.shared_room == 'yes'){
            shared_room = true;
        }else {
            shared_room = false;
        }

        if(req.body.pet_friendly == 'yes'){
            pet_friendly = true;
        }else {
            pet_friendly = false;
        }

        console.log("Sending New Room Request to Dynamo");


        dbops.addNewRoom(creator,req.body.roomname,room_availablity,req.body.address,req.body.numrooms,ac,internet,washer,dryer,parking,gym,pool,shared_room,pet_friendly,req.body.rent,req.body.details,function (error, result,data) {

            if (error || !result) {

                console.log("Error received from Dynamo");
                console.log(error);

            } else {
                console.log("Room addition is successful");
                console.log(result);

                console.log("Adding room to users current room");
                dbops.UpdateUserTable(creator,'currroom',data,function (error1,result1) {

                    if (error1 || !result1) {
                        console.log('Error in adding room to users current room: \n',error1);
                    } else {
                        console.log('Users table updated successfully: \n',result1);
                        console.log("REDIRECTING TO PROFILE PAGE");
                        return res.redirect('/profile');
                    }

                })


            }

        })


    } else {

        var err = new Error('Sorry, all details are required fields.');
        err.status = 400;
        return next(err);

    }

})

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

        userNEW.newUser(email,name,gender,username,password, function (error, result) {
            // res.send(data);
            // req.session.username = username;
            console.log("ADDING USER TO COGNITO");
            if (error || !result) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            }  else {

                // console.log('DATA???????????????????????????\n', result);
                // console.log(req.session);

                req.session.username = req.body.username;
                req.session.registered = true;

                // console.log("SESSION DATA AFTER REGISTRATION");
                // console.log(req.session);

                // console.log(username, email, gender, name);

                console.log("USER REGISTERED IN COGNITO SUCCESSFULLY");

                dbops.addNewUser(username,email,gender,name,function (error1,result1) {

                    console.log("ADDING USER TO DYNAMO");

                    if (error1 || !result1) {
                        console.log(error1);
                    } else {
                        console.log("USER ADDED IN DYNAMO SUCCESSFULLY");
                        console.log(result1);
                    }

                });

                return res.render('conf', { title: 'Confirmation' });
            }
        });



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

