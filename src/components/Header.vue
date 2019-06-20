<template>
    <div>

        <h1> {{this.headline}} </h1>
        <h1> {{this.reversedMessage}} </h1>
        <div>
            <b-img src="https://sound.peal.io/ps/covers/000/007/488/medium/hqdefault.jpg?1517036605" fluid alt="Responsive image"></b-img>
        </div>
        <b-nav tabs>
            <b-nav-item disabled><b>Ten Question Quiz</b></b-nav-item>
            <b-nav-item disabled>Number of correct Answers: 0/10 </b-nav-item>
        </b-nav>  

    </div>


</template>

//yo what up Lance

<script> 
export default { 
    data() {
        return {
            headline: "Triva"
        }
    }, 
    computed : {
        reversedMessage() {
            return this.headline.split('').reverse().join('')
        }
    }
}
</script>