/**
 * Created by jaildar on 10/05/17.
 */

var AWS1 = require("aws-sdk");

AWS1.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});

function removeuser(userid,roomid)
{
    var docClient = new AWS1.DynamoDB.DocumentClient();
    var table = "Room";


    var params = {
        TableName: table,
        Key: {
            "RoomID": roomid  //Username for which data is needed
        }
    };


    docClient.get(params,function (err, data) {


        if (err) {

            console.log(err);
            // console.error("Unable to read item. Error JSON:", err); //if(err) impies there is no data, so it will return null
            // value1=err; // no need for this
            // return value1;
            // console.log(err) //will show you the error or callback(err) will pass this to the callback

        } else {
            console.log(data.Item.Users)
            var user=data.Item.Users[0];
            var  index=0;
            for (var i = 0; i < user.length; i++) {

                if(userid==user[i])
                {
                    index=i;
                    break;

                }

            }
            var table ='Room';

            var params = {
                TableName: "Room",
                Key: {"RoomID": roomid },

                    ExpressionAttributeNames:{
                        "#list":"Users"
                    },

                UpdateExpression: "REMOVE #list[" + index + "]"
            }

            console.log("Removing the User...");
            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                }
            });










        }});


}

