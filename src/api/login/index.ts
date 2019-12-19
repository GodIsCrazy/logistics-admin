// const Request = require('@/api/request.ts')
import Request from '@/api/request'

export default {
  /* 登录接口 */
  submitLogin: (data: object = {}): any => {
    return Request({ ...data }, '/logistics/users/login', 'post')
  }
}
