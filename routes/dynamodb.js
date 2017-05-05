/**
 * Created by whamsy on 5/3/17.
 */

module.exports.dbfunc = function () {


    var AWS = require('aws-sdk');

    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var session = require('express-session');

    this.addNewUser= function (username,useremail,usergender,name,callback) {

        // var documentClient = new dbclient.DocumentClient();
        var table = "User";
        // console.log(username, useremail, usergender, name);

        console.log("ADDING " + username + "to User Table");

        var params = {
            TableName:table,
            Item:{
                "username": username,
                "name": name,
                "gender": usergender,
                "email": useremail,
                "Preferences":[],
                "Profile_Picture":'#',
                "Rating":0,
                "User_available":true,
                "Tasks":[],
                "Room_Interested":false
            }
        };

        docClient.put(params, function(error, result) {
            if (error) {
                // console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                console.log(error);
                return callback(error);
            } else {
                // console.log("Added item:", JSON.stringify(data, null, 2));
                // console.log('result passed');
                // console.log('JSOn OUTPUT: ', JSON.stringify(result, null, 2));
                // console.log('RESULT',result);
                console.log("record added successfully");
                return callback(null,result);
            }
        });


    }

    this.UpdateUserTable= function (username, parametername, parametervalue,callback) {

        var params = {
            TableName:'User',
            Key:{

                "username": username
            },
            UpdateExpression: "set "+parametername+" = :r",
            ExpressionAttributeValues:{
                ":r":parametervalue
            }
        };

        console.log("UPDATING " + username + "'s "+parametername+"s");

        docClient.update(params, function(error, result) {
            if (error) {
                // console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                console.log(error);
                return callback(error);
            } else {
                // console.log("Added item:", JSON.stringify(data, null, 2));
                // console.log('result passed');
                // console.log('JSOn OUTPUT: ', JSON.stringify(result, null, 2));
                // console.log('RESULT',result);
                console.log("preferences updated successfully");
                return callback(null,result);
            }
        });



    }

    this.getuserdetails = function(username,callback) {

        var params = {
            TableName: "User",
            Key: {
                "username": username
            }
        };


        docClient.get(params,function (err, data) {

            if (err) {

                return callback(err);

            } else{

                var value1={};
                value1["Name"]=data.Item.name;
                value1["Rating"]=data.Item.Rating;
                value1["ProfilePic"]=data.Item.Profile_Picture;
                value1["Room_Interested"]=data.Item.Room_Interested;
                value1["Preferences"]=data.Item.Preferences;
                value1["username"]=data.Item.username;

                return(callback(null,value1));
            }
        });

    }
}


// function getuserdetails(username,callback) {
//
//     var docClient = new AWS1.DynamoDB.DocumentClient();
//     var table = "USER";
//     var condition=true; //what is this for?
//
//     var params = {
//         TableName: table,
//         Key: {
//             "UserID": username  //TaskID for which you want ROOM_ID
//         }
//     };
//
//
//     docClient.get(params,function (err, data) {
//
//
//         if (err) {
//
//             return callback(err);
//             // console.error("Unable to read item. Error JSON:", err); //if(err) impies there is no data, so it will return null
//             // value1=err; // no need for this
//             // return value1;
//             // console.log(err) //will show you the error or callback(err) will pass this to the callback
//
//         } else{
//
//             // value1["Name"]=data.Item.Name;
//             // value1["Rating"]=data.Item.Rating;
//             // value1["ProfilePic"]=data.Item.Profile_Picture;
//             // value1["Room_Interested"]=data.Item.Room_Interested;
//             // value1["Preferences"]=data.Item.Preferences;
//             // value1["User_ID"]=data.Item.UserID;
//
//             return(callback(null,data));
//
//         }});
//
// }
//
//
//
// var x=getuserdetails(2,function (error, result){
//
//     if (error || !result) {
//
//         console.log(error);
//     }  else {
//         console.log(result);
//     }
//
// });