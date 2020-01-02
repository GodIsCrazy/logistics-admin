import axios from 'axios'
import store from '@/store'
import utils from '@/utils'
import router from '@/router'
import { Message } from 'element-ui'

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
    if (utils.getCookie('token')) {
      config.headers['AUTH-TOKEN'] = utils.getCookie('token')
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
      utils.removeCookieItem('token')
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      Message.error(data.msg)
    } else if (data.status === 'C00003') { // 账号密码错误
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      Message.error(data.msg)
    } else if (data.status === 'C00001') { // 请求成功
      return data.result
    } else { // 其他错误
      Message.error(data.msg)
      return Promise.reject(data.msg)
    }
  }, (err) => {
    Message.error(err)
    return Promise.reject(err)
  })

export default instance
