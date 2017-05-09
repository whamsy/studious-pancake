/**
 * Created by jaildar on 08/05/17.
 */


var AWS1 = require("aws-sdk");

AWS1.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});
var dynamodb = new AWS1.DynamoDB();


/* This example scans the entire Music table, and then narrows the results to songs by the artist "No One You Know". For each item, only the album title and song title are returned. */

var params = {

    ExpressionAttributeValues: {
        ":a": {
            BOOL:true
        }
    },
    FilterExpression: "Room_Available=:a",
    TableName: "Room"
};
dynamodb.scan(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {

        for (var i = 0; i < data.Items.length; i++){
            console.log(data.Items[i].Name.S);      //Print Names of All Roooms which are available

        }

    }
    // successful response
});