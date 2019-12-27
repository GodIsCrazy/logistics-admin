import Request from '@/api/request'

export default {
  /* 登录接口 */
  getUserList: (data: object): any => {
    return Request({ ...data }, '/logistics/user/userList')
  },
  saveUser: (data: object) => {
    return Request({ ...data }, '/logistics/user/saveUser', 'post')
  },

  /* 根据菜单id获取菜单信息 */
  getUserDetailById: (data: object = {}) => {
    return Request({ ...data }, '/logistics/user/getUserDetailById')
  },
  /* 删除菜单 */
  deleteUser: (data: object = {}) => {
    return Request({ ...data }, '/logistics/user/deleteUser')
  },
  getRoleList: (data:object = {}) => {
    return Request({ ...data }, '/logistics/role/getRoleList')
  }
}
