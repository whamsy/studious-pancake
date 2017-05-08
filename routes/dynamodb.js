/**
 * Created by whamsy on 5/3/17.
 */

module.exports.dbfunc = function () {


    var AWS = require('aws-sdk');

    const randint = require('uuid/v4');

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


    this.addNewRoom= function (username,name,availability,address,numrooms,ac,wifi,washer,dryer,parking,gym,pool,shared,pets,rent,info,callback) {

        var table = "Room";
        var x = randint();

        console.log("ADDING Room with ID" + x + "to Room Table");

        var params = {
            TableName:table,
            Item:{
                "roomID": x,
                "roomname": name,
                "address": address,
                "createdby": username,
                "Users":[username],
                "Tasks":[],
                "Room_Available": availability,
                "User_Interested":[],
                "Room_Details":{
                    "numrooms": numrooms,
                    "pets":pets,
                    "airconditioner":ac,
                    "internet":wifi,
                    "washer":washer,
                    "dryer":dryer,
                    "parking":parking,
                    "gym":gym,
                    "pool":pool,
                    "rent":rent,
                    "info":info
                }

            }
        };

        docClient.put(params, function(error, result) {
            if (error) {
                console.log(error);
                return callback("Error while adding room to dynamo: ",error);
            } else {
                console.log("Room added successfully to dynamo");

                console.log("ADDING Room with ID" + x + "to Users current room");

                return callback(null,result,x);
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
                value1["gender"]=data.Item.gender;
                value1["currRoom"]=data.Item.currroom;
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

    this.getroomdetails = function(roomID,callback) {


        var table = "Room";


        var params = {
            TableName: table,
            Key: {
                "roomID": roomID //RoomID for which details are required.
            }
        };


        docClient.get(params,function (err, data) {


            if (err) {

                return callback(err);
                // console.error("Unable to read item. Error JSON:", err); //if(err) impies there is no data, so it will return null
                // value1=err; // no need for this
                // return value1;
                // console.log(err) //will show you the error or callback(err) will pass this to the callback

            } else{
                var value2={};


                value2["roomID"]= data.Item.roomID;
                value2["roomname"]= data.Item.roomname;
                value2["address"]= data.Item.address;
                value2["Users"]= data.Item.Users;
                value2["Tasks"]= data.Item.Tasks;
                value2["Room_Available"]= data.Item.Room_Available;
                value2["User_Interested"]= data.Item.User_Interested;
                value2["numrooms"]= data.Item.Room_Details['numrooms'];
                value2["pets"]=data.Item.Room_Details['pets'];
                value2["airconditioner"]=data.Item.Room_Details['airconditioner'];
                value2["internet"]=data.Item.Room_Details['internet'];
                value2["washer"]=data.Item.Room_Details['washer'];
                value2["dryer"]=data.Item.Room_Details['dryer'];
                value2["parking"]=data.Item.Room_Details['parking'];
                value2["gym"]=data.Item.Room_Details['gym'];
                value2["pool"]=data.Item.Room_Details['pool'];
                value2["rent"]=data.Item.Room_Details['rent'];
                value2["info"]=data.Item.Room_Details['info'];

                return(callback(null,value2));

            }
        });





    }

    this.addusertoroom = function(UserID,RoomID,callback)
    {


        var table ='Room';

        var params = {
            TableName: table,
            Key: {roomID: RoomID},
            UpdateExpression: "SET #attrName = list_append(#attrName,:attrValue)",
            ExpressionAttributeNames: {
                "#attrName": "Users"
            },
            ExpressionAttributeValues: {
                ':attrValue': [UserID]
            }
        }

        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                return(callback(null,data));

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
