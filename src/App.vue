<template>
  <div id="app">
    <p> {{username}} </p>
    <p> text from input text : {{inputText}} </p>

    <input v-model="inputText">

    <p>Displaying a list : </p>
    <li v-for="todo in todos" v-bind:key="todo.id" >
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


  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

export default {
  name: 'app',
  components: {
    Header, 
    QuestionBox

  }, 
  data() {
    return {
      questions: [], 
      index: 0, 
      username : "guppykang", 
      inputText : "", 
      todos : [
        {text : '1. Learn Vue.js'}, 
        {text : '2. Ask Lance about my project'}, 
        {text : '3. Get started on my project asap'}
      ]
    }
  },
  methods: {
    next() {
      this.index++
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