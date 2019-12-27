import Vue from 'vue'
import vueRouter from 'vue-router'
import routes from './routes'

Vue.use(vueRouter)

const router = new vueRouter({
  mode: 'hash',
  routes
})

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})
export default router