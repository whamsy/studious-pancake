
// var aws = require('aws-sdk');

module.exports.newUser = function (dataEmail, dataName, dataGender,username,password) {

    var AWSCognito = require('amazon-cognito-identity-js');

    var poolData = {
        UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
        ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
    };

    var attributeList = [];

    var userPool = new AWSCognito.CognitoUserPool(poolData);

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
//
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
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

module.exports.authUser = function(username, password, callback)
{
    global.navigator = () => null;

    var AWSCognito = require('amazon-cognito-identity-js');

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

    // let cognitoUser = this.userPool.getCurrentUser();

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function(result)
        {
            callback(null, {success: true, data: result.getAccessToken().getJwtToken()});
            // console.log(result);
            console.log('access token is ' + result.getAccessToken().getJwtToken());
        },
        onFailure: function(err)
        {
            console.log('authUser error: ',err);
            return callback(err);
            // alert(err);
        }


    });


}



// authUser('palku','P@lak123');

// var getattr = function (username, password) {
//
//     global.navigator = () => null;
//
//     var AWSCognito = require('amazon-cognito-identity-js');
//
//     if (!username || !password)
//     {
//         callback(new Error('Invalid parameters.'));
//         return false;
//     }
//
//     var poolData = {
//         UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
//         ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
//     };
//
//     var userPool = new AWSCognito.CognitoUserPool(poolData);
//
//     // var authData = {
//     //     Username: username,
//     //     Password: password
//     // };
//
//     // var authDetails = new AWSCognito.AuthenticationDetails(authData);
//
//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//
//     var cognitoUser = new AWSCognito.CognitoUser(userData);
//
//     cognitoUser.getUserAttributes(function(err, result) {
//         // if (err) {
//         //     console.log(err);
//         //     return;
//         // }
//         for (i = 0; i < result.length; i++) {
//             console.log('\nattribute ' + result[i].getName() + ' has value ' + result[i].getValue());
//         }
//     });
// }
//
// getattr('palku','P@lak123');

// var AWSCognito = require('amazon-cognito-identity-js');
//
// var poolData = {
//     UserPoolId : 'us-west-2_Zv3F0BFug', // Your user pool id here
//     ClientId : '1s3ls78inc1gu69tde8n634kj' // Your client id here
// };
//
// var attributeList = [];

// var username = 'mogambo';
//
// var password = 'MOG@mbo123'
//
// var dataEmail = {
//     Name : 'email',
//     Value : 'email2@mydomain.com'
// };
//
// var dataName = {
//     Name : 'name',
//     Value : 'tester tha mein'
// };
//
// var dataGender = {
//     Name : 'gender',
//     Value : 'M'
// };


// signup(dataEmail,dataName,dataGender,username,password);

// var userPool = new AWSCognito.CognitoUserPool(poolData);
// //
// var attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
// var attributePhoneNumber = new AWSCognito.CognitoUserAttribute(dataGender);
// var attributeNaam = new AWSCognito.CognitoUserAttribute(dataName);
// //
// // console.log(userPool,attributeEmail);
// console.log(userPool['userPoolId'],attributeEmail,attributePhoneNumber,attributeNaam);

// attributeList.push(attributeEmail);
// attributeList.push(attributePhoneNumber);
// attributeList.push(attributeNaam)
//
//
// userPool.signUp('username', 'P@ssword123', attributeList, null, function(err, result){
//     if (err) {
//         console.log(err);
//         return;
//     }
//     cognitoUser = result.user;
//     console.log('user name is ' + cognitoUser.getUsername());
// });

// console.log(cognitoidentityserviceprovider1);
// console.log(cognitoidentityserviceprovider2);

// var authUser = function(params, callback)
// {
//     if (!params || !params.Email || !params._password)
//     {
//         callback(new Error('Invalid parameters.'));
//         return false;
//     }
//
//     var poolData = {
//         UserPoolId: conf.AWSConfig.UserPoolId,
//         ClientId: conf.AWSConfig.ClientId
//     };
//
//     var userPool = new aws.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
//     var authData = {
//         Username: params.Email,
//         Password: params._password
//     };
//
//     var authDetails = new aws.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
//     var userData = {
//         Username: params.Email,
//         Pool: userPool
//     };
//
//     var cognitoUser = new aws.CognitoIdentityServiceProvider.CognitoUser(userData);
//
//     cognitoUser.authenticateUser(authDetails, {
//         onSuccess: function(result)
//         {
//             callback(null, {success: true, data: result});
//         },
//         onFailure: function(err)
//         {
//             console.log('authUser error: ' + util.inspect(err));
//             callback(err);
//         }
//     });
// }