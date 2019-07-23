<template>
    <div v-if="didHappen">
        <label> 
            {{message1}}
        </label>
        <button v-on:click="message2OnClick()">  
            {{message2}} was said {{count}} times 
        </button>

        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        <button
            @click="incrementCount"
        > 
            increment vuex number of drinks

        </button>

        <br>

        <input
            v-model="inputDrinks"
            type="text"
        >
        <button 
            @click="addAmount"
        >
            Add!
        </button>

        

        <span> exapmle of using vuex : number of drinks = {{numOfDrinks}} </span>
    </div>
</template>


<script>

import { mapMutations, mapState } from "vuex";

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
            count : 0, 
            inputDrinks : 0
        }
    }, 
    methods: {
        ...mapMutations("drinks", ["incrementCount"]), 
        ...mapMutations("drinks", ["addCount"]), 

        message2OnClick() {
            this.count++;
        }, 
        addAmount(){
            this.addCount(parseInt(this.inputDrinks, 10));
        }
    }, 
    computed : {
        ...mapState("drinks", ["numOfDrinks"]), 
        
    }

}
</script>

