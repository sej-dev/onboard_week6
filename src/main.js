import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


require('@/assets/css/index.css')
require('@/assets/css/base.css')