/**
 * Created by jaildar on 08/05/17.
 */

var AWS = require("aws-sdk");
//To support various S3 operations in Application;

var s3 = new AWS.S3();
var Upload = require('s3-uploader');

function createS3bucket(userid) {

    var myBucket = userid;
    s3.createBucket({Bucket: myBucket}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
        });

}


function uploadS3bucket(bucketname,datafile) {   //Version 1
    var client = new Upload(bucketname, {
        aws: {
            path: 'profilepic/',
            region: 'us-east-1',
            acl: 'public-read'
        },

        cleanup: {
            versions: true,
            original: false
        },

        original: {
            awsImageAcl: 'public-read'
        },

        versions: [{
            maxHeight: 1040,
            maxWidth: 1040,
            format: 'jpg',
            suffix: '-Final',
            quality: 80,

        }
        ]
    });





    client.upload(datafile, {}, function(err, versions, meta) {
        if (err) { throw err; }

        versions.forEach(function(image) {
            console.log(image.url)
        });
    });







}

//Second variant of uploading and getting image url for displaying

function putimage(bucketname,imagename,image)

{
    var s3Bucket = new AWS.S3( { params: {Bucket: bucketname} } );
    //var key=imagename+'/';
    var data = {Key:imagename, Body: image};
    s3Bucket.putObject(data, function(err, data){
        if (err)
        { console.log('Error uploading data: ', data);
        } else {
            console.log('succesfully uploaded the image!');
        }
    });

    var urlParams = {Bucket: bucketname, Key: imagename};
    s3Bucket.getSignedUrl('getObject', urlParams, function(err, url){
        console.log('the url of the image is', url);
    })

}



//Notes Create a bucket with unique name then use either of the methods to upload image to a named bucket and get url



