// /**
//  * Created by whamsy on 5/1/17.
//  */
//
// module.exports.logged = function(){
//
//     var x = 'OLA';
//
//     this.test1 = function (y) {
//
//         console.log('logged',y,x);
//
//     };
//
//     this.authzed = function(sessionSet){
//
//         if(sessionSet){
//             console.log('authorized');
//             console.log(x);
//         }
//
//     }
// }
//


var AWSCognito = require('amazon-cognito-identity-js');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

var session = require('express-session');

var poolData = {
    UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
    ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
};

// var identityPoolId = 'us-west-2:07e2306f-3515-438e-bf18-e1cb472c1230';
//
// var loginId = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_Zv3F0BFug';

var userPool = new AWSCognito.CognitoUserPool(poolData);


var cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
        if (err) {
            this.logoutUser();
            return;
        }
        this.session.user = cognitoUser;
    });
}
console.log(cognitoUser);