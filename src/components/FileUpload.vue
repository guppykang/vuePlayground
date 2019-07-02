<template>
    <div class="selector-label">
        <label for="uploadImage">
            Upload:
            <input type="file" id="uploadImage " ref="uploadImage" v-on:change="handleFileUpload"/>
        </label>
        <button v-on:click="handleSubmit">Submit</button>

        <p> {{reversedMessage}} </p>

     </div>
</template>


<script>
import axios from 'axios';
const image2Base64 = require('image-to-base64');

export default {
    data() {
        return {
            message : "hi mom ", 
            file : '', 
            signedURL : ''
        }
    }, 
    methods : {
        handleFileUpload() {
            this.file = this.$refs.uploadImage.files[0];
        }, 
        async handleSubmit() {

            try {
                const signedResponse = await axios.get(`/getURL?file-name=${this.file.name}&file-type=${this.file.type}`);
                this.signedURL = signedResponse.data.signedRequest; 

                const imageURL = URL.createObjectURL(this.file);

                const base64Translation = await image2Base64(imageURL);
                
                //console.log(base64Translation);

                try {
                    //we can have the base64 here or the file itself
                    const res = await axios.put(this.signedURL, ""+ base64Translation);
                    console.log(res);
                }
                catch (err) {
                    console.log(err)
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