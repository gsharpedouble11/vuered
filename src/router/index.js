import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ran from '../views/Ran.vue'
import Hotzone from '../views/Hotzone.vue'
import Posting from '../views/Posting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/random',
    name: 'Random',
    component: Ran
  },
  {
    path: '/hot-zone',
    name: 'Hot',
    component: Hotzone
  },
  {
    path: '/post',
    name: 'Posting',
    component: Posting
  }
]

const router = new VueRouter({
  routes
})

export default router
