<template>
    <div>
        <label v-if="visible"> hi mom </label>
        <button @click="toggleVisible">toggle "hi mom"</button>
        <p> hi dad </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: true
        }
    }, 
    methods : {
        toggleVisible() {
            this.visible = !this.visible;
            console.log(this.visible)
        }
    }
}
</script>


<style scoped>

</style>
