<template>
    <div class="selector-label">
        <label for="uploadImage">
            Upload:
            <input type="file" id="uploadImage " ref="uploadImage" v-on:change="handleFileUpload"/>
        </label>


        <button v-on:click="handleSubmit">Submit</button>

        <p> {{reversedMessage}} </p>
        <input v-model="requestedFileName" placeholder="e.g hiMom.png"> 
        <button v-on:click="handleDownload">Download</button>

        <br>
        <img v-bind:src="downloadedImage" width="750"> 
     </div>
</template>


<script>
import axios from 'axios';
const image2Base64 = require('image-to-base64');
const b64toBlob = require('b64-to-blob');

export default {
    data() {
        return {
            message : "hi mom ", 
            file : '', 
            signedURL : '', 
            requestedFileName : '', 
            downloadedImage : ''
        }
    }, 
    methods : {
        handleFileUpload() {
            this.file = this.$refs.uploadImage.files[0];
        }, 
        async handleSubmit() {

            try {
            //     const signedResponse = await axios.get(`/getURL?file-name=${this.file.name}&file-type=${this.file.type}`);
            //     this.signedURL = signedResponse.data.signedRequest; 

                const imageURL = URL.createObjectURL(this.file);
                console.log(imageURL)

                const base64Translation = await image2Base64(imageURL);
                const payload = {
                    base64 : base64Translation
                };

                // console.log(base64Translation);
                    
                try {
                    const success = await axios.post(`/api/upload?file-name=${this.file.name}`, payload );
                    console.log("/api/upload status : " + success)
                }
                catch (err) {
                    console.log(err)
                }

                
                // try {
                //     //we can have the base64 here or the file itself
                //     const res = await axios.put(this.signedURL, ""+ base64Translation);
                //     console.log(res);
                // }
                // catch (err) {
                //     console.log(err)
                // }

            }
            catch (err) {
                console.log(err)    
            }
        }, 
        async handleDownload() {
            try {
                const response = await axios.get(`/api/download?file-name=${this.requestedFileName}`);
                console.log("response in front end " + response.data)
                if (response != null ) {
                    console.log('response was not null')
                    let blob = b64toBlob(response.data.toString(), 'image/png');
                    console.log("blob : " + blob.data);
                    this.downloadedImage = URL.createObjectURL(blob);
                    console.log("new URL : " + this.downloadedImage);


                }
            }
            catch (err) {
                console.log(err)
            }

        }
    }, 
    computed: {
       reversedMessage : {
           get() {
               return this.message.split('').reverse().join('');
        }, 
        gotDownloadedImage : {
            get() {
                console.log("current url : "  + this.downloadedImage);
                return this.downloadedImage != '';
            }
        }
           

       } 
    }
}
</script>

<style scoped>
.wrapper {
  display: inline-flex;
}

.selector-label {
  border: 1px red;

}

.checkbox-wrapper {
  padding-left: 10px;
}

.checkbox-wrapper label {
  font-weight: normal;
}
</style>