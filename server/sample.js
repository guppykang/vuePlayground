
// Load the SDK and UUID
let AWS = require('aws-sdk');
const fs = require('fs');
const image2base64 = require('image-to-base64');
const Blob = require('node-blob');
const express = require('express');
const {promisify} = require('util')
const base64Img = require('base64-img');


const app = express();
const port = 3030; 


// Create an S3 client'
let ep = new AWS.Endpoint('store-test.blobstore.apple.com')
let s3 = new AWS.S3({endpoint: ep, region : 'store-test'});

s3.putObjectPromise = promisify(s3.putObject);
s3.getObjectPromise = promisify(s3.getObject);
s3.listBucketsPromise = promisify(s3.listBuckets);
base64Img.imgPromise = promisify(base64Img.img);


// Create a bucket and upload something into it
let bucketName = 'node-sdk-sample-';
let keyName = 'hello_world.txt';

const db = require('./db');

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended : true, limit: '50mb'}));
app.use (bodyParser.json({limit: '50mb'}));

// Create the parameters for calling createBucket
let bucketParams = {
  Bucket : bucketName,
  ACL : 'public-read-write'
};

let fileToStore =  'maxresdefault.jpg'
//'obesity-meme.png';

/*************************** Routes **************************/
app.get('/getURL', async(req, res) => {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  const params = {
    Bucket : bucketName, 
    Key : fileName, 
    Expires : 3600, 
    ContentType : 'image/png'  
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if(err) {
      console.log(err)
      return res.end()
    }
    const returnData = {
      signedRequest : data, 
      url : `https://${bucketName}.store-test.bloblstore.apple.com/${fileName}` 
    }
    res.send(returnData);
    res.end()
  })

});


app.post('/testPost', async (req, res) => {
  console.log('hit /testPost')
  console.log(req.body)
});


app.get('/test', async (req, res) => {
  // res.send('What up Lance');
  let returnData = {
    message : "what's up lance", 
    otherMessage : "what's good Lance"
  
  };

  res.send(returnData)
  console.log('hit /test')
})



app.get('/himom', async (req, res) => {
  res.send('api/upload for uploading image, and api/download for downloading image');
  const buckets = await getBuckets();
})



app.post('/api/upload', async (req, res) => {
  
  const base64Data = req.body.base64;
  console.log(base64Data);
  const fileName = req.query['file-name'];
  console.log( fileName)
  

  let sucessful; 
  try {
    sucessful = await uploadObject(bucketName, fileName, base64Data);
  }
  catch(err) {
    console.log(err)
  }

  // console.log(sucessful);
  res.send(sucessful);
})


app.get('/api/download', async (req, res) => {
  const fileName = req.query['file-name'];
  let sucessful = false; 
  try {
    sucessful = await downloadObject(bucketName, fileName, './downloadFile');
    res.send(sucessful);
    
  }
  catch(err) {
    console.log(err)
  }

  

})

app.get('/api/testmessage', async(req, res) => {
  
})


/*************************** Put **************************/
const base64 = async (path ) => {
  //try catch this one
  let result =  await image2base64(path)  
  fs.writeFileSync('pureData', result)
  return result;

}

function createUploadParams(bucketName, key, blob) {
  return {
    Bucket : bucketName, 
    Key : key,
    Body : blob
  }
}

async function uploadObject(bucketName, key, base64Conversion ) {
  console.log(base64Conversion)
  let params = createUploadParams(bucketName, key, base64Conversion.toString());

  let sucessful = false;

  //thanks Devon ur a homie

  try {
    const data = await s3.putObjectPromise(params);
    sucessful = true;
    console.log("Putting object Success ", data);
  }
  catch (err) {
    console.log("ERROR FROM JOSHUA : Putting object Error", err);
    sucessful = false;
  }
  
  return sucessful;
 

  
}


/*************************** GET **************************/



function createDownloadParams(bucketName, key) {
  return {
    Bucket : bucketName, 
    Key : key
  }
}

async function downloadObject(bucketName, key) {

  const params = createDownloadParams(bucketName, key);

  try {
    const data = await s3.getObjectPromise(params);
    // console.log("data : " + data.Body);
    return data.Body;
  //   fs.writeFileSync(destination, data.Body)

  //   let filePath; 
  //   try {
  //     filePath = await base64Img.imgPromise('data:image/png;base64, ' + data.Body.toString(), './files', 'obesityMemeDownloaded' )
  //     console.log('FILEPATH: ' + filePath);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }

  //   return data.Body;
  }
  catch (err) {
    console.log(err);
  }

  return null;
  
  
}

async function getBuckets() {

  try {
    const data = await s3.listBucketsPromise();
    console.log(data);
    return data;
  }
  catch (err) {
    console.log(err);
  }

  return data;
}

app.listen(port, () => console.log('mcqueen app running on port ' + port ));