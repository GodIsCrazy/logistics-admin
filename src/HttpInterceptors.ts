import axios from 'axios'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded'
  }
})
/**
 *  请求拦截器
 */

instance.interceptors.request.use(
  (config: any): any => {
    if (store.getters.token) {
      config.headers['AUTH-TOKEN'] = store.getters.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  })

/**
 *  响应拦截器
 */

instance.interceptors.response.use(
  (response: any): any => {
    let data = response.data
    if (data.status === 'C00007') { // token 失效
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    } else if (data.status === 'C00003') {
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return data.result
  }, (err) => {
    return Promise.reject(err)
  })

export default instance
