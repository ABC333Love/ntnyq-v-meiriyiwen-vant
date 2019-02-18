import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as filters from '@/filters'

import './plugins/vant'
import './styles/style'

// Regist filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  ...App
}).$mount('#app')
