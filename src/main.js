import Vue from 'vue'
import App from '../src/App'
import router from '../src/router'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(ant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
