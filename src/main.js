import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// Configuración global de Axios
axios.defaults.baseURL = 'https://rickandmortyapi.com/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')