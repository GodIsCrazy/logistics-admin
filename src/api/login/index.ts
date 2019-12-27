// const Request = require('@/api/request.ts')
import Request from '@/api/request'

export default {
  /* 登录接口 */
  submitLogin: (data: object = {}): any => {
    return Request({ ...data }, '/logistics/login', 'post')
  },
  /* 获取用户信息 */
  getUserInfo: (data: object = {}): Promise<any> => {
    return Request({ ...data }, '/logistics/user/userInfo')
  }
}
