import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        user: null
    },
    mutations: {

        setUser(state, p) {
            state.user = p
        }
    }
})