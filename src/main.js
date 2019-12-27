import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import elementUI from 'element-ui'


Vue.use(elementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
