<template>
  <div id="app">
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
      index: 0
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