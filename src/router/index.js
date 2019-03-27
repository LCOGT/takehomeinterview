import Vue from 'vue'
import Router from 'vue-router'
import PostsManager from '@/components/PostsManager'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Planets',
      component: PostsManager
    }
  ]
})

export default router
