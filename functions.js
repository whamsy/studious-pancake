var AWS1 = require("aws-sdk");

AWS1.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});

function createtables(tablename,primarykeyname,primarykeytype) //"KeyType should be "N","S" or "B" where N is number,S is string and B is binary
{
    var dynamodb = new AWS1.DynamoDB();

    var params = {
        TableName : tablename,
        KeySchema: [
            {AttributeName: primarykeyname, KeyType:"HASH"}
        ],
        AttributeDefinitions: [
            { AttributeName: primarykeyname, AttributeType: primarykeytype },


        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }


    };
    dynamodb.createTable(params,function(err, data) {

        if (err) {
            console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });



}
function adduser(UserID,Name,Preference,ProfilePictureLink) //Preference should be in form of array []
{
    var documentClient = new AWS1.DynamoDB.DocumentClient();
    var table = "USER";



    var params = {
        TableName:table,
        Item:{
            "UserID": UserID,
            "Name": Name,
            "Preferences":Preference,
            "Profile_Picture":ProfilePictureLink,
            "Rating":0,
            "User_available":true,
            "Tasks":[],
            "Room_Interested":[]
        }
    };

    documentClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

    var AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:3000"
    });

}

function addroom(RoomId,Name,UserID,Address,NoofRooms,PetFriendly,Neighbourhood,Utilities,Rent)
{

    var documentClient = new AWS1.DynamoDB.DocumentClient();
    var table = "Room";



    var params = {
        TableName:table,
        Item:{
            "RoomID": RoomId,
            "Name": Name,
            "Users":[UserID],
            "Tasks":[],
            "Room_Available":true,
            "User_Interested":[],
            "Address":Address,
            "Room_Details":{
                "Noofrooms":NoofRooms,
                "PetFriendly":PetFriendly,
                "Neighborhood":Neighbourhood,
                "Utilities":Utilities,
                "Rent":Rent
            }

        }
    };

    documentClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

}


function addTasktoRoom(TaskID,RoomID)
{
    var docClient = new AWS1.DynamoDB.DocumentClient()

    var table ='Room';

    var params = {
        TableName: table,
        Key: {RoomID: RoomID},
        UpdateExpression: "SET #attrName = list_append(#attrName,:attrValue)",
        ExpressionAttributeNames: {
            "#attrName": "Tasks"
        },
        ExpressionAttributeValues: {
            ':attrValue': [TaskID]
        }
    }

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });









}

function addTask(TaskID,TaskName,RoomID,StartDate,Frequency)
{
    var documentClient = new AWS1.DynamoDB.DocumentClient();
    var table = "Task";


    var params = {
        TableName:table,
        Item:{
            "TaskID": TaskID,
            "TaskName":TaskName,
            "Room_ID":RoomID,
            "Start_Date":StartDate,
            "Frequency":Frequency //Frequency once in a month

        }

    };




    documentClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

    addTasktoRoom(TaskID,RoomID);
}


function addusertoroom(UserID,RoomID)
{
    var docClient = new AWS1.DynamoDB.DocumentClient()

    var table ='Room';

    var params = {
        TableName: table,
        Key: {RoomID: RoomID},
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
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });


}

// function getuserdetails(username,callback) {
//
//     var docClient = new AWS1.DynamoDB.DocumentClient();
//     var table = "USER";
//
//
//     var params = {
//         TableName: table,
//         Key: {
//             "UserID": username  //Username for which data is needed
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
//             var value1={};
//             value1["Name"]=data.Item.Name;
//             value1["Rating"]=data.Item.Rating;
//             value1["ProfilePic"]=data.Item.Profile_Picture;
//             value1["Room_Interested"]=data.Item.Room_Interested;
//             value1["Preferences"]=data.Item.Preferences;
//             value1["User_ID"]=data.Item.UserID;
//
//             return(callback(null,value1));
//
//         }});
//
// }