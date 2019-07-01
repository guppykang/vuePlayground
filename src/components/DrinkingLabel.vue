<template>
    <div v-if="didHappen">
        <label> 
            {{message1}}
        </label>
        <button v-on:click="message2OnClick()">  
            {{message2}} was said {{count}} times 
        </button>

    </div>
</template>


<script>

import axios from 'axios';

export default {
    props : { 
        didHappen : {
            type : Boolean,
            default : true, 
            requried : false
        }, 
        message1 : String, 
        message2 : String 
    }, 
    data() {
        return {
            count : 0
        }
    }, 
    methods: {
        message2OnClick() {
            axios
            this.count++;
        }
    }

}
</script>

