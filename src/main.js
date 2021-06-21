import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import Echo from 'laravel-echo';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.clickOnce = true;
window.io = require('socket.io-client');
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: "localhost:6001",
});
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
