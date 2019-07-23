 const state = {
    numOfDrinks : 5
 }; 

const mutations = {
    incrementCount(state) {
        state.numOfDrinks++;
    }, 
    addCount(state, value) {
        state.numOfDrinks  += value;
    } 
}; 

const actions = {
    
 }; 
 
 

 const getters = {

 }; 

 export default {
    state, 
    actions, 
    mutations, 
    getters, 
    namespaced : true
 }