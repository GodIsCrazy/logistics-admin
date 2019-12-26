import Router from './permission'
import store from '@/store'
import Utils from '@/utils'
import router from '@/router'

Router.beforeEach((to: any, from: any, next: any) => {
  if (to.path === '/login') {
    if (Utils.getCookie('token')) {
      store.dispatch('GET_PERSON_INFO').then(() => {
        router.push({
          path: '/home'
        })
      }).catch(() => {
        // next()
        Utils.removeCookieItem('token')
        next()
      })
    } else {
      next()
    }
  } else {
    if (Utils.getCookie('token')) {
      store.dispatch('GET_PERSON_INFO').then(() => {
        next()
      }).catch(() => {
        Utils.removeCookieItem('token')
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
    } else {
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
})

Router.afterEach((to: any, from: any) => {

})

export default Router
