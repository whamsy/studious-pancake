
// var aws = require('aws-sdk');

module.exports.Auth = function () {

    var AWSCognito = require('amazon-cognito-identity-js');
    var AWS = require('aws-sdk');
    AWS.config.region = 'us-west-2';

    var session = require('express-session');

    var poolData = {
        UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
        ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
    };

    var identityPoolId = 'us-west-2:07e2306f-3515-438e-bf18-e1cb472c1230';

    var loginId = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_Zv3F0BFug';

    var userPool = new AWSCognito.CognitoUserPool(poolData);

    this.newUser= function (dataEmail, dataName, dataGender,username,password) {

        var attributeList = [];

        var dataEmail = {
            Name : 'email',
            Value : dataEmail
        };

        var dataName = {
            Name : 'name',
            Value : dataName
        };

        var dataGender = {
            Name : 'gender',
            Value : dataGender
        };

        var attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AWSCognito.CognitoUserAttribute(dataGender);
        var attributeNaam = new AWSCognito.CognitoUserAttribute(dataName);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        attributeList.push(attributeNaam);

        userPool.signUp(username, password, attributeList, null, function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            var newcognitoUser = result.user;
            console.log('user name is ' + newcognitoUser.getUsername());
        });

    }

    this.authUser = function (username, password, callback) {

        global.navigator = () => null;

        if (!username || !password)
        {
            callback(new Error('Invalid parameters.'));
            return false;
        }

        AWS.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

        var authData = {
            Username: username,
            Password: password
        };

        var authDetails = new AWSCognito.AuthenticationDetails(authData);

        var userData = {
            Username: username,
            Pool: userPool
        };

        var cognitoUser = new AWSCognito.CognitoUser(userData);

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: function(result)
            {
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: identityPoolId,
                    Logins: {}
                })

                AWS.config.credentials.params.Logins[loginId] = result.getIdToken().getJwtToken();

                callback(null, {success: true, data: result.getAccessToken().getJwtToken(), userdata: cognitoUser});
                // console.log(result);
                // console.log('access token is ' + result.getAccessToken().getJwtToken());
            },
            onFailure: function(err)
            {
                console.log('authUser error: ',err);
                return callback(err);
            }


        });
    }

    this.conf = function (username,confnum) {

        var userData = {
            Username : username,
            Pool : userPool
        };

        var cognitoUser = new AWSCognito.CognitoUser(userData);

        cognitoUser.confirmRegistration(confnum, true, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('call result: ' + result);
        });

    }




}

module.exports.getattr = function (username, password, callback) {

    global.navigator = () => null;

    var AWSCognito = require('amazon-cognito-identity-js');

    var authData = {
        Username : username,
        Password : password,
    };

    var authDetails = new AWSCognito.AuthenticationDetails(authData);


    if (!username || !password)
    {
        callback(new Error('Invalid parameters.'));
        return false;
    }

    var poolData = {
        UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
        ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
    };

    var userPool = new AWSCognito.CognitoUserPool(poolData);

    var userData = {
        Username: username,
        Pool: userPool
    };

    var cognitoUser = new AWSCognito.CognitoUser(userData);



    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function(result)
        {
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }

                for (i = 0; i < result.length; i++) {
                    if(result[i].getName() === 'name'){
                       var x = result[i].getValue();
                       return callback(null, x);
                    }
                }


            });
            callback(null, {success: true, data: result.getAccessToken().getJwtToken()});
            // console.log(result);
            // console.log('access token is ' + result.getAccessToken().getJwtToken());
        },
        onFailure: function(err)
        {
            console.log('authUser error: ',err);
            return callback(err);
            // alert(err);
        }


    });
}





module.exports.conf = function (username,confnum) {
    global.navigator = () => null;

    var AWSCognito = require('amazon-cognito-identity-js');

    var poolData = {
        UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
        ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
    };

    var userPool = new AWSCognito.CognitoUserPool(poolData);

    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new AWSCognito.CognitoUser(userData);

    cognitoUser.confirmRegistration(confnum, true, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('call result: ' + result);
    });

}


module.exports.currUser = function () {
    global.navigator = () => null;

    var AWSCognito = require('amazon-cognito-identity-js');

    var poolData = {
        UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
        ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
    };

    var userPool = new AWSCognito.CognitoUserPool(poolData);

    var usercur = userPool.getCurrentUser();

    console.log('CURR USER IS: '+usercur);

    if (usercur != null) {
        usercur.getSession(function(err, session) {
            if (err) {
                console.log(err);;
                return;
            }
            console.log('session validity: ' + session.isValid());
        })
    }

    // var userData = {
    //     Username : username,
    //     Pool : userPool
    // };
    //
    // var cognitoUser = new AWSCognito.CognitoUser(userData);
    //
    // cognitoUser.confirmRegistration(confnum, true, function(err, result) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log('call result: ' + result);
    // });

}