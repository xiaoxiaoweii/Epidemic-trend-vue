import Vue from 'vue'
import VueRouter from 'vue-router'
import map from '../views/map.vue'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(VueRouter)

const routes = [
  { path:'/', redirect:'/map' },
  { path: '/map', component: map }
]

const router = new VueRouter({
  routes
})

export default router
