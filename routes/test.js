/**
 * Created by whamsy on 4/29/17.
 */
var express = require('express');
var router = express.Router();

var AWSCognito = require('amazon-cognito-identity-js');
var user = require('./user.js');

var testing = require('./testfunc.js');

var test3 = new testing.logged();

var userNEW = new user.Auth();

// test3.test1(' mera naam');
//
test3.authzed(true);



//
// userNEW.authUser('whamsy', 'WH@msy8055', function (error, result) {
//     if (error || !result) {
//         var err = new Error('Wrong email or password.');
//         err.status = 401;
//         console.log(err);
//     }  else {
//         console.log('logged in');
//
//         user.currUser();
//
//         user.getattr('whamsy', 'WH@msy8055',function (error, result){
//
//             console.log(result);
//
//             console.log('SESSION; ',user.Auth.session);
//
//         });
//     }
// });


// user.currUser();


// userNEW.newUser('va766@nyu.edu','Joker','Male','whamsy4','WH@msy8055');

// user.conf('whamsy123','408652');

