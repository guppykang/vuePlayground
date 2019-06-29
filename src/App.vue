<template>
  <div id="app">
    <input type="file"
       id="listPickerImage" name="listPickerImage"
       accept="image/png, image/jpeg">

    <p> {{username}} </p>
    <p> text from input text : {{inputText}} </p>
    <p> reversed text from input text : {{reversedMessage}} </p>
     

    <input v-model="inputText">

    <li v-for="todo in todos" v-bind:key="todo.id" v-bind:title="todo.text">
      {{todo.text}}
    </li>

    <Header/>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>     
          <QuestionBox
            :currentQuestion="questions[index]"
            :next="next"
          />
        </b-col>
      </b-row>
    </b-container>

    <label
      class="form-check-label"
      for="small"
    >
      <input
        id="small"
        v-model="selected"
        true-value="small"
        false-value=""
        type="checkbox"
      >
      HI MOMMMMMMMMMMMMMMMMMM
    </label>

    <DrinkingLabel :message1="vbindLabel"
                  message2="Say sorry to Tim cook!"/>

    <span v-bind:title="message">
      Hover your mouse over me for a few seconds
      to see my dynamically bound title!
    </span>

  <b-tabs content-class="mt-3">
    <b-tab title="First" active>
      <p>I'm the first tab</p>
      <FileUpload/>

    
    </b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
  </b-tabs>

  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'
import DrinkingLabel from './components/DrinkingLabel.vue'
import FileUpload from './components/FileUpload'

export default {
  name: 'app',
  components: {
    Header, 
    QuestionBox, 
    DrinkingLabel, 
    FileUpload
  }, 
  data() {
    return {
      message : "on " + new Date(),
      questions: [], 
      index: 0, 
      username : "guppykang", 
      inputText : "", 
      todos : [
        {id : 1, text : '1. Learn Vue.js'}, 
        {id : 2, text : '2. Ask Lance about my project'},
        {id : 3, text : '3. Get started on my project asap'}
      ], 
      vbindLabel : "Underage drinking is bad Josh!"
    }
  },
  methods: {
    next() {
      this.index++
    }
  },
  computed: {
    reversedMessage : {
      get() {
          return this.inputText.split('').reverse().join('');
      }
    } 
  },
  mounted: function() {
    fetch('https://opentdb.com/api.php?amount=10', {
      method : 'get'
    })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      this.questions = json.results 
    })
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
; 