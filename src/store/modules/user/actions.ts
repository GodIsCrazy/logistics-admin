import Api from '@/api/login/index'
import MenuApi from '@/api/menu/index'
import UserApi from '@/api/login'

import utils from '@/utils'
export default {
  'LOGIN_IN': async ({ commit }: any, data: any) => {
    let result = await Api.submitLogin(data)
    console.log(result)
    utils.setCookie('token', result.token)
    sessionStorage.setItem('userId', result.userId)
    commit('SET_TOKEN', result.token)
    commit('SET_PERMISSION', result.permissionMenuList)
  },
  'LOGOUT': ({ commit }: any, data: any) => {
    utils.removeCookieItem('token')
    sessionStorage.removeItem('userId')
  },
  'GET_PERSON_INFO': async ({ commit }: any, data: any) => { // 请求获取用户信息
    let permissionMenuList = await UserApi.getUserInfo({
      userId: sessionStorage.getItem('userId')
    })
    commit('SET_PERMISSION', permissionMenuList.menuList)
  }
}
