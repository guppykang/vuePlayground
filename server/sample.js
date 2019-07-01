
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

// Create the parameters for calling createBucket
let bucketParams = {
  Bucket : bucketName,
  ACL : 'public-read'
};

let fileToStore =  'maxresdefault.jpg'
//'obesity-meme.png';

/*************************** Routes **************************/
app.get('/test', async (req, res) => {
  res.send('What up Lance');
})

app.get('/himom', async (req, res) => {
  res.send('api/upload for uploading image, and api/download for downloading image');
  const buckets = await getBuckets();
})



app.post('/api/upload', async (req, res) => {
  

  let sucessful; 
  try {
    sucessful = await uploadObject(bucketName, fileToStore);
  }
  catch(err) {
    console.log(err)
  }

  console.log(sucessful);
  
})


app.get('/api/download', async (req, res) => {
  let sucessful; 
  try {
    sucessful = await downloadObject(bucketName, fileToStore, './downloadFile');
  }
  catch(err) {
    console.log(err)
  }

  console.log(sucessful);
  

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

async function uploadObject(bucketName, key) {
  let base64Conversion;
  try {  
    base64Conversion = await base64(key);

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
    catch (err) {
      console.log(err);
    }

  
}


/*************************** GET **************************/



function createDownloadParams(bucketName, key) {
  return {
    Bucket : bucketName, 
    Key : key
  }
}

async function downloadObject(bukcetName, key, destination) {

  const params = createDownloadParams(bucketName, key);

  try {
    const data = await s3.getObjectPromise(params);
    console.log(data);
    //TODO: this is still lmessed up check the output file
    fs.writeFileSync(destination, data.Body)

    let filePath; 
    try {
      filePath = await base64Img.imgPromise('data:image/png;base64, ' + data.Body.toString(), './files', 'obesityMemeDownloaded' )
      console.log('FILEPATH: ' + filePath);
    }
    catch (err) {
      console.log(err);
    }

    return data.Body;
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