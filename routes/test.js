/**
 * Created by whamsy on 4/29/17.
 */
// var express = require('express');
// var router = express.Router();


// var database = require('./dynamodb.js');
// var dbops = new database.dbfunc();
//
//
var date = require('date-and-time');
// var HashMap = require('hashmap');
//
//
var x = date.parse('2017-05-10','YYYY-MM-DD');
console.log(date.format(x,'YYYY-MM-DD ddd'));
//
// var y = date.format('2017-05-10','ddd MMM DD YYYY').toString();
//
// console.log(y);
//
// var z = date.parse(y,'ddd MMM DD YYYY');
//
// console.log(z);

const sortBy = require('sort-array')

var Tasks =
    [ { taskname: 'Get milk',
        userassigned: 'palku',
        taskid: '0de628d5-8648-45dd-b942-cc191ba23386',
        taskdate: 'Mon May 29 2017' },
        { taskname: 'Get milk',
            userassigned: 'profx',
            taskid: '0de628d5-8648-45dd-b942-cc191ba23386',
            taskdate: 'Mon May 15 2017' },
        { taskname: 'Get milk',
            userassigned: 'profx',
            taskid: '0de628d5-8648-45dd-b942-cc191ba23386',
            taskdate: 'Mon Jun 12 2017' } ]
sortBy(Tasks,'taskdate');

console.log(Tasks);

// var data = {
//     taskname: 'testtask3',
//     roomid: 'd61dcd2e-3487-4b13-aba6-5cedd568962c',
//     startdate: '2017-05-17',
//     enddate: '2017-06-18',
//     freq: 1,
//     usersadded: ['palku', 'whamsy']
// }
//
// var x = date.parse(data.startdate,'YYYY-MM-DD');
// var y = date.parse(data.enddate,'YYYY-MM-DD');
//
//
// console.log(date.parse('Tue Jul 04 2017 00:00:00 GMT-0400 (EDT)','WWW MMM DD YYYY hh:mm:ss [GMT]Z'))
//
//
// var map = new HashMap();
//
// var date1 = x;
//
// var userindex = 0;
//
// while(date1 < y){
//     var curruser = data.usersadded[userindex++];
//     map.set(date1,curruser);
//     date1 = date.addDays(date1,data.freq);
//     if(!data.usersadded[userindex]){
//         userindex = 0;
//     }
// }
//
// var taskarray = []
//
//
// map.forEach(function(value, key) {
//     // console.log(date.format(key,'ddd MMM DD YYYY') + " : " + value);
//     var temparray = [];
//     temparray['date'] = date.format(key,'ddd MMM DD YYYY');
//     temparray['userassigned'] = value;
//
//     taskarray.push(temparray);
// });
//
// // console.log(taskarray[0].userassigned);
//
// // console.log(taskarray);
//
// var taskid = "a8d7dbe4-7e77-4c43-9e8e-c96250da537a";
//
// dbops.addTasktoRoom(data.roomid,taskarray,taskid)

// var finalmap = new HashMap();
// finalmap.set(data.taskname,taskarray);
//
//
// console.log(finalmap.get('testtask3'));




// var AWSCognito = require('amazon-cognito-identity-js');
// var user = require('./user.js');
//
// var testing = require('./testfunc.js');
//
// var test3 = new testing.logged();
//
// var userNEW = new user.Auth();
//
// // test3.test1(' mera naam');
// //
// test3.authzed(true);

// const randint = require('uuid/v4');
// var i = 0;
// while(i < 10){
//
//     var x = randint();
//     console.log(x);
//     i++;
// }
//
// var params = {
//     TableName: 'User',
//     ProjectionExpression: "username, gender, email,Preferences,Profile_Picture,Rating,User_available,Tasks,Room_Interested",
//     FilterExpression: 'gender = :v1 or gender = :v2',
//     ExpressionAttributeValues: {
//         ":v1": "Female",
//         ":v2": "Male"
//     }
// };
//
//
// docClient.scan(params, function(err, data) {
//     if (err) ppJson(err); // an error occurred
//     else ppJson(data); // successful response
// });
//

// var params = {
//     TableName: 'Room',
//     ProjectionExpression:"roomname,roomID,address,Tasks,Room_Available,User_Interested,Room_Details,#usrs",
//     FilterExpression: 'roomID = :v1',
//     ExpressionAttributeNames:{
//         "#usrs": "Users"
//     },
//     ExpressionAttributeValues: {
//         ":v1": "d61dcd2e-3487-4b13-aba6-5cedd568962c",
//     }
// };
//
//
// docClient.scan(params, function(err, data) {
//     if (err) ppJson(err); // an error occurred
//     else ppJson(data); // successful response
// })

// var x = ['yes',true,'ROOROOOSO'];

// var bools_only = ['room_available','airconditioner','internet','washer','dryer','parking','gym','pool','shared_room','pet_friendly'];
//
// for (word in bools_only){
//     // if (req.body.bools_only[word] == 'yes'){
//         console.log(req.body.bools_only[word]);
//     // }
// }

// var date = require('date-and-time');
// var now = new Date();

// date.format(now, 'ddd MMM DD YYYY');

// console.log(date);

// console.log(now);
// console.log(date.format(now,'ddd MMM DD YYYY'));
// console.log(now);
// console.log(date.format(tmrrw,'ddd MMM DD YYYY'));
// console.log(tmrrw);

// var testdate = date.format('2017-05-16','ddd MMM DD YYYY')
// var x = date.parse('2017-05-16', 'YYYY-MM-DD');
// console.log(x);
// console.log(date.format(x, 'ddd MMM DD YYYY'));
// var next = date.addDays(x,200);
// console.log(next);
// console.log(date.format(next, 'ddd MMM DD YYYY'));


// console.log('diff:');
// console.log((next - x)/(60*60*24*1000));


// var attr = require('dynamodb-data-types').AttributeValue;
//
// var data = {
//     Roomidtest: 10,
//     Users: ['Riceuser', 'Noodlesuser'],
//     roomname: "blahroom",
//     isThatYou: true,
//     Tasks: [
//         {'Task1' :[{date: 'date', user:'user'},{date: 'date', user:'user'},{date: 'date', user:'user'}]},
//         {'Task2' :[{date: 'date', user:'user'},{date: 'date', user:'user'},{date: 'date', user:'user'}]}
//         ],
//     day: 'Tuesday'
// };
//
// var dynamodbData = attr.wrap(data);
//
// console.log(dynamodbData.Users.length);
// console.log(tmrrw == now);

// console.log(date.format(date.addDays(new Date(),3000), 'ddd MMM DD YYYY'));
//
// console.log(date.format(tmrrw, 'ddd MMM DD YYYY'));

// var x_dict = {ac:'yes',washer:'no'}
//
// for (word in x) console.log(typeof x[word]);



//
// userNEW.authUser('whamsy', 'WH@msy8055', function (error, result) {
//     if (error || !result) {
//         var err = new Error('Wrong email or password.');
//         err.status = 401;
//         console.log(err);
//     }  else {
//         console.log('logged in');
//
//         user.currUser();
//
//         user.getattr('whamsy', 'WH@msy8055',function (error, result){
//
//             console.log(result);
//
//             console.log('SESSION; ',user.Auth.session);
//
//         });
//     }
// });


// user.currUser();


// userNEW.newUser('va766@nyu.edu','Joker','Male','whamsy4','WH@msy8055');

// user.conf('whamsy123','408652');



// var params = {
//     TableName: 'Room',
//     ProjectionExpression:"roomname,roomID,address,Tasks,Room_Available,User_Interested,Room_Details,#usrs",
//     FilterExpression: 'roomID = :v1',
//     ExpressionAttributeNames:{
//         "#usrs": "Users"
//     },
//     ExpressionAttributeValues: {
//         ":v1": "d61dcd2e-3487-4b13-aba6-5cedd568962c",
//     }
// };
//
//
// docClient.scan(params, function(err, data) {
//     if (err) ppJson(err); // an error occurred
//     else ppJson(data); // successful response
// })



// var params = {
//     TableName: 'Room',
//     Key: {
//         "roomID": 'd61dcd2e-3487-4b13-aba6-5cedd568962c' //RoomID for which details are required.
//     }
//     // ProjectionExpression:"roomname,roomID,address,Tasks,Room_Available,User_Interested,Room_Details,#usrs",
//     // FilterExpression: 'roomID = :v1',
//     // ExpressionAttributeNames:{
//     //     "#usrs": "Users"
//     // },
//     // ExpressionAttributeValues: {
//     //     ":v1": "d61dcd2e-3487-4b13-aba6-5cedd568962c",
//     // }
// };
//
//
// docClient.get(params, function(err, data) {
//     if (err) console.log(err); // an error occurred
//     else console.log(data.Item.Users.length);
// })


// var params = {
//     TableName:"testroom3",
//     Item:{
//         "roomid": "1950",
//         "title": "Testing123",
//         "Users": [
//                 {'tom' :
//                   [ {'item1':'item2'},{'item3':'item4'}]
//                 },
//                 {'dick' :
//                   [ {'item1':'item2'},{'item3':'item4'}]
//                 }
//             ],
//         "Details":{
//             "pets": false,
//             "info": "its alright"
//         }
//         // "tasks": ['taskid1':{"date1":"user1","date2":"user2","date3":"user1","date4":"user4"}],'taskid2':[{"date5":"user1","date6":"user2","date7":"user1","date8":"user4"}]
//     }
// };

// console.log("Adding a new item...");
// docClient.put(params, function(err, data) {
//     if (err) ppJson(err); // an error occurred
//     else ppJson(data); // successful response
// });



// var params = {
//     TableName: "testroom3",
//     Key: {
//         "roomid": "1950"
//     }
// };


// docClient.get(params, function(err, data) {
//         if (err) ppJson(err); // an error occurred
//     else console.log(data.Item.Users[0].tom.length); // successful response
// })

// add date and task to a taskID in room
// var params = {
//     TableName:'Room',
//     Key:{
//         "roomID": 'd61dcd2e-3487-4b13-aba6-5cedd568962c'
//     },
//     UpdateExpression: "set NewTasks[0] = :r",
//     ExpressionAttributeValues:{
//         ":r":[ {'date1':'user1'},{'date2':'user2'}]
//     }
// };


// add new tasks to a room
// var params = {
//     TableName:'Room',
//     Key:{
//         "roomID": 'd61dcd2e-3487-4b13-aba6-5cedd568962c'
//     },
//     UpdateExpression: "set NewTasks[0] = :r",
//     ExpressionAttributeValues:{
//         ":r":[
//             {'taskid1':[]},
//             {'taskid2':[]}
//         ]
//     }
// };




// console.log(date.format(x,'ddd MMM DD YYYY'),'\n',date.format(y,'ddd MMM DD YYYY'));

// var tmrrw = date.addDays(now, 3000);

// for (users in data.usersadded) console.log('\n',data.usersadded[users]);


// map.set(x,data.usersadded[0]);
// map.set(date.addDays(x,data.freq),data.usersadded[1]);

