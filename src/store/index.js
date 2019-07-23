import Vue from "vue";
import Vuex from "vuex";

import drinks from "./drinks";

Vue.use(Vuex); 

export default new Vuex.Store({
    modules : {
        drinks
    }

});