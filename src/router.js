import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * Importing the compnents for registration
 */
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Index from './components/index';
import ChatIndex from './components/chat/UserChat';

Vue.use(VueRouter);

// routes for the settings application
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/index',
            component: Index,
            name: Index
        },
        {
            path: '/register',
            component: Register,
            name: Register
        },
        {
            path: '/login',
            component: Login,
            name: Login,
        },
        {
            path: '/chat',
            component: ChatIndex,
            name: ChatIndex,
        },
        {
            path: '/home',
            component: Home,
            name: Home,
        },
    ],
});
export default router