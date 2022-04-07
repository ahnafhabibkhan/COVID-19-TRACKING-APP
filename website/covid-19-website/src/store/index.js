import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            // This will store the state until browser is closed. When user
            // logs out manually, should call sessionStorage.clear();
            storage: window.sessionStorage,
        })
    ],
    state: {

        user: null,
        selectedUser: null
    },
    mutations: {

        setUser(state, p) {
            state.user = p
        },
        delUser(state) {
            state.user = null
        }
    }
})