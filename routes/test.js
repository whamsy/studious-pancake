/**
 * Created by whamsy on 4/29/17.
 */
// var express = require('express');
// var router = express.Router();
//
// var AWSCognito = require('amazon-cognito-identity-js');
// var user = require('./user.js');
//
// var testing = require('./testfunc.js');
//
// var test3 = new testing.logged();
//
// var userNEW = new user.Auth();
//
// // test3.test1(' mera naam');
// //
// test3.authzed(true);

const randint = require('uuid/v4');
var i = 0;
while(i < 10){

    var x = randint();
    console.log(x);
    i++;
}

var params = {
    TableName: 'User',
    ProjectionExpression: "username, gender, email,Preferences,Profile_Picture,Rating,User_available,Tasks,Room_Interested",
    FilterExpression: 'gender = :v1 or gender = :v2',
    ExpressionAttributeValues: {
        ":v1": "Female",
        ":v2": "Male"
    }
};


docClient.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});




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

