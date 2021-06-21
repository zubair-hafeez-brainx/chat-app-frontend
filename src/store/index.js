import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import users from './users.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        user: null,
        currentUser: null,
        activatedUser: null,
    },
    modules: {
        users
    },
    actions: {
        async retrieveToken({commit}, user) {
            const resp = await axios({
                url: 'http://chat-app.test/api/login',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: user
            });
            localStorage.setItem('jwt', resp.data.token);
            commit('setToken', resp.data.token);
            return true
        },
        async retrieveCurrentUser({commit}) {
            const resp = await axios({
                url: 'http://chat-app.test/api/user',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            commit('currentUser', resp.data);
            return true
        },
        async regsiterUser({commit}, user) {
            const resp = await axios({
                url: 'http://chat-app.test/api/register/users',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: user
            });
            commit('setUser', resp.data);
            return true
        }
    },
    mutations: {
        /**
         * Global state setters
         */
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        currentUser(state, user) {
            state.currentUser = user;
        },
    }
});

