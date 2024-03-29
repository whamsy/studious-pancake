/**
 * Created by whamsy on 5/3/17.
 */

module.exports.dbfunc = function () {

    const randint = require('uuid/v4');
    var AWS = require('aws-sdk');
    var fs = require('fs');

    AWS.config.update({ accessKeyId:'AKIAJKS7OFMOF326UI5A', secretAccessKey: '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' });



    AWS.config.update({
        region: "us-west-2",
        endpoint: "https://dynamodb.us-west-2.amazonaws.com"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var session = require('express-session');

    var date = require('date-and-time');


    this.uploadtos3 = function () {


        var s3 = new AWS.S3();

        var s3Bucket = new AWS.S3( { params: {Bucket: 'room8karma-images'} } )

        var data = {Key: imageName, Body: imageFile};

        s3Bucket.putObject(data, function(err, data){
            if (err)
            { console.log('Error uploading data: ', data);
            } else {
                console.log('succesfully uploaded the image!');

                var urlParams = {Bucket: 'myBucket', Key: 'imageName'};
                s3Bucket.getSignedUrl('getObject', urlParams, function(err, url){
                    console.log('the url of the image is', url);
                })
            }
        });





    }

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
                "Profile_Picture":'default',
                "Rating":0,
                "User_available":true,
                "Tasks":[],
                "Reviews":[],
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

        console.log(params);



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

    this.UpdateRoomTable= function (roomID, parametername, parametervalue,callback) {

        var params = {
            TableName:'Room',
            Key:{

                "roomID": roomID
            },
            UpdateExpression: "set "+parametername+" = :r",
            ExpressionAttributeValues:{
                ":r":parametervalue
            }
        };

        // console.log("UPDATING " + username + "'s "+parametername+"s");

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

    this.searchrooms= function (callback) {


        var params = {
            TableName: "Room",
            ProjectionExpression: "roomID",
            FilterExpression: "#yr = :v1",
            ExpressionAttributeNames: {
                "#yr": "Room_Available",
            },
            ExpressionAttributeValues: {
                ":v1" : true
            }
        };

        docClient.scan(params, function(err, data) {
            if (err) {
                console.log(err)
            } // an error occurred
            else {
                var numrooms = data.Items.length;

                var result = [];

                var i = 0;

                while(i<numrooms){
                    result.push(data.Items[i++].roomID)
                }

                callback(null,result);
            }
        });


    }

    this.searchroom8s= function (callback) {


        var params = {
            TableName: "User",
            ProjectionExpression: "username",
            FilterExpression: "#yr = :v1",
            ExpressionAttributeNames: {
                "#yr": "currRoom",
            },
            ExpressionAttributeValues: {
                ":v1" : null
            }
        };

        docClient.scan(params, function(err, data) {
            if (err) {
                console.log(err)
            } // an error occurred
            else {
                var numusers = data.Items.length;

                var result = [];

                var i = 0;

                while(i<numusers){
                    result.push(data.Items[i++].username)
                }

                callback(null,result);
            }
        });


    }



    this.RemoveUserfromRoomTable= function (roomID, position,callback) {


        var table ='Room';

        var params = {
            TableName: "Room",
            Key: {"RoomID": roomID },

            ExpressionAttributeNames:{
                "#list":"Users"
            },

            UpdateExpression: "REMOVE #list[" +position+ "]"
        }

        console.log("Removing the User...");

        docClient.update(params, function(err, data) {
            if (err) {
                // console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return callback(err);
            } else {
                // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                return callback(null,data);
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
                value1["currRoom"]=data.Item.currRoom;
                value1["Name"]=data.Item.name;
                value1["Rating"]=data.Item.Rating;
                value1["dp"]=data.Item.Profile_Picture;
                value1["Room_Interested"]=data.Item.Room_Interested;
                value1["Preferences"]=data.Item.Preferences;
                value1["username"]=data.Item.username;
                value1["age"]=data.Item.Age;
                value1["about"]=data.Item.About;
                value1["Tasks"]=data.Item.Tasks;
                if(data.Item.Tasks != null){
                    value1["numtasks"]=data.Item.Tasks.length;
                } else {
                    value1["numtasks"]=0;
                }

                value1["numreviews"]=data.Item.Reviews.length;
                value1["Reviews"]=data.Item.Reviews;

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
                value2["numusers"] = data.Item.Users.length;
                value2["numtasks"] = data.Item.Tasks.length; //EDIT!
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

    this.addtask = function(TaskName,RoomID,StartDate,EndDate,Frequency,callback)
    {
        var table = "Task";

        var y = randint();

        var params = {
            TableName:table,
            Item:{
                "taskID": y,
                "TaskName":TaskName,
                "Room_ID":RoomID,
                "Start_Date":StartDate, //date.parse(StartDate, 'YYYY-MM-DD')
                "End_Date":EndDate, //date.parse(EndDate, 'YYYY-MM-DD'),
                "Frequency":Frequency //Frequency in number of days
            }

        };

        docClient.put(params, function(err, data) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                // console.log("Added item:", JSON.stringify(data, null, 2));
                console.log("Dynamo says Added task successfully:");
                return(callback(null,data,y));
            }
        });
    }

    this.addTasktoRoom = function(RoomID,TaskArray,callback)
    {

        var table ='Room';

        var params = {
            TableName: table,
            Key: {"roomID": RoomID},
            UpdateExpression: "SET #attrname = list_append(#attrname, :attrValue)",
        //     // UpdateExpression: "SET NewTask1.#number = :string",
            ExpressionAttributeNames: {
                "#attrname" : "Tasks"
        //         // "#attrName": "NewTasks"
            },
            ExpressionAttributeValues: {
                ':attrValue': [{taskid:TaskArray['taskid'],taskname: TaskArray['taskname'],taskdate: TaskArray['taskdate'], userassigned: TaskArray['userassigned'],completed:false}]
            }
        }


        // console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                // console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                console.log(err);
                return callback(err);
            } else {
                // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                console.log("Dynamo says added task to room successfully:");
                return(callback(null,data));
            }
        });
    }

    this.addTasktoUser = function(username,TaskArray,callback)
    {

        var table ='User';

        var params = {
            TableName: table,
            Key: {"username": username},
            UpdateExpression: "SET #attrname = list_append(#attrname, :attrValue)",
            //     // UpdateExpression: "SET NewTask1.#number = :string",
            ExpressionAttributeNames: {
                "#attrname" : "Tasks"
                //         // "#attrName": "NewTasks"
            },
            ExpressionAttributeValues: {
                ':attrValue': [{taskid:TaskArray['taskid'],taskname: TaskArray['taskname'],taskdate: TaskArray['taskdate'],completed:false}]
            }
        }


        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                // console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                console.log(err);
                return callback(err);
            } else {
                // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                console.log("Dynamo says added task to User table successfully:");
                return(callback(null,data));
            }
        });
    }

    this.addReviewtoUser = function(username,reviewArray,callback)
    {

        var table ='User';

        var params = {
            TableName: table,
            Key: {"username": username},
            UpdateExpression: "SET #attrname = list_append(#attrname, :attrValue)",
            //     // UpdateExpression: "SET NewTask1.#number = :string",
            ExpressionAttributeNames: {
                "#attrname" : "Reviews"
                //         // "#attrName": "NewTasks"
            },
            ExpressionAttributeValues: {
                ':attrValue': [{reviewtext:reviewArray['review'],reviewer: reviewArray['reviewer'],sentiment: reviewArray['sentiment'],rating:reviewArray['rating']}]
            }
        }


        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                // console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                console.log(err);
                return callback(err);
            } else {
                // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                console.log("Dynamo says added task to User table successfully:");
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
