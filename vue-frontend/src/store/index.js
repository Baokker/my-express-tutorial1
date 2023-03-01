import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: getToken(),
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        }
    },
})

export default store
