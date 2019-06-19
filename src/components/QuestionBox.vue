<template>
    <div class="question-box-container">
        <b-jumbotron >
            <template slot="lead">
                {{currentQuestion.question}}
            </template>

            <hr class="my-4">

            <p>
            10
            10
            10
            10
            </p>

            <b-button variant="primary" href="#">Submit</b-button>
            <b-button v-on:click="next" variant="success" href="#">Next 

            </b-button>
        </b-jumbotron>
    </div>  
</template>

// using this to tell the App that we are accepting a prop called currentQuestion 
<script>
export default {
    props: {
        currentQuestion: Object, 
        next: Function
    }
}
</script>
l