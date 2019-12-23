import Api from '@/api/login/index'
import MenuApi from '@/api/menu/index'

import utils from '@/utils'
export default {
  'LOGIN_IN': async ({ commit }: any, data: any) => {
    let result = await Api.submitLogin(data)
    console.log(result)
    utils.setCookie('token', result.token)
    commit('SET_TOKEN', result.token)
    commit('SET_PERMISSION', result.permissionMenuList)
  },
  'LOGOUT': ({ commit }: any, data: any) => {
    utils.removeCookieItem('token')
  },
  'GET_PERSON_INFO': async ({ commit }: any, data: any) => { // 请求获取用户信息
    let permissionMenuList = await MenuApi.getMenuList({
      userName: 'admin'
    })
    commit('SET_PERMISSION', permissionMenuList.menuList)
  }
}
