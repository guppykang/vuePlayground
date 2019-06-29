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
export default {
    data() {
        return {
            message : "hi mom "
        }
    }, 
    methods : {
        handleFileUpload() {

        }, 
        handleSubmit() {

            alert('hi mom ')
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