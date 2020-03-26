import Vue from 'vue'
import VueRouter from 'vue-router'
import map from '../views/map.vue'
import axios from 'axios'
// import basicLayout from '../views/basicLayout.vue'
import Lines from '../views/line.vue'

Vue.prototype.$http = axios

Vue.use(VueRouter)

const routes = [
  { path:'/', redirect:'/map' },
  { path: '/map', component: map },
  { path: '/line', component: Lines }
  // { path: '/basicLayout', component: basicLayout }
]

const router = new VueRouter({
  routes
})

export default router
