const express = require('express')
const app = express()
const axios = require('axios')

//to create the v4 signature for the api calls for mcqueen (not sure if mcqueen supports aws-sdk)
var crypto = require("crypto-js");

var keys = require('./config/config.js');

//to create the random object keys
var uuid = require('uuid');

var bucketName = 'test-sample-' + uuid.v4();
var keyName = 'hi_mom.txt';

var signatureHeader;

//region : configure this as such : https://docs.pie.apple.com/blob_store/getting_started.html#what-region-should-i-configure-my-client-to-use
var region = "store-test";

//current date
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; 
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var fullDate = '' + year + month + day;

//service : I have no idea if this is right. The docs did not mention this. aws examples say "ec2", but we're using mcqueen
var service = "mcqueen";



//getting the signature v4 as shown here : https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-javascript
//full python implementation here : https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html
function getSignatureKey(key, dateStamp, regionName, serviceName) {
    var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = crypto.HmacSHA256(regionName, kDate);
    var kService = crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}

function checkKeys(ACCESS_KEY_ID, SECRET_ACCESS_KEY) {
    if (ACCESS_KEY_ID == null || SECRET_ACCESS_KEY == null){
        console.log("missing access keys to interact with mcqueen s3");
    }
    else {
        console.log("all keys present");
        

        signatureHeader =  getSignatureKey(SECRET_ACCESS_KEY, fullDate, region, service  )
        console.log(signatureHeader);
    }
}

function postToMcqueen(ACCESS_KEY_ID, SECRET_ACCESS_KEY ){

}


const port = 7070

app.get('/', (req, res) => {
    checkKeys(keys.ACCESS_KEY_ID, keys.SECRET_ACCESS_KEY);
    res.send('Hi mom -Josh !');
})

app.get('/post', (req, res) => {
    res.send('posting to mcqueen baby !')
    //axios call to the endpoint : https://docs.pie.apple.com/blob_store/blob_store_clients.html#rest-api
})


app.listen(port, () => console.log(`Example mcqueen app listening on port ${port}!`))