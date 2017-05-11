/**
 * Created by jaildar on 10/05/17.
 */


function addTasktoRoom(RoomID)
{
    var docClient = new AWS1.DynamoDB.DocumentClient()

    var table ='Room';

    var params = {
        TableName: table,
        Key: {RoomID: RoomID},
        UpdateExpression: "SET #attrName = :map",
        ExpressionAttributeNames: {
            "#attrName": "NewTasks"
        },
        ExpressionAttributeValues: {
            ':map': [{'test1':2}]
        }
    }

    console.log("Updating the item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

