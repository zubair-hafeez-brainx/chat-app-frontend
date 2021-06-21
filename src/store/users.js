import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        friends: [],
        userChat: [],
        searchedUsers: [],
    },
    actions: {
        async retrieveFriends({commit}) {
            const resp = await axios({
                url: 'http://chat-app.test/api/message/friends',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: null
            });
            return commit('set', resp);
        },
        async userChat({commit}, id) {
            const resp = await axios({
                url: 'http://chat-app.test/api/message/user-chat',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                params: id
            });
            console.log(resp)
            return commit('setChat', resp);
        },
        async sendMessage({commit}, message) {
            const resp = await axios({
                url: 'http://chat-app.test/api/message',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                data: message
            });
            commit('updateChat', resp);
            return true
        },
        async searchUser({commit}, data) {
            const resp = await axios({
                url: 'http://chat-app.test/api/user/search',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                params: data
            });
            commit('setSearchUsers', resp);
            return true
        },
    },
    mutations: {
        set(state, users) {
            state.friends = users.data;
        },
        setChat(state, chat) {
            state.userChat = chat.data.reverse();
        },
        updateChat(state, message) {
            state.userChat.push(message.data)
        },
        setSearchUsers(state, data) {
            console.log(data)
            state.searchedUsers = data;
        }
    }
};