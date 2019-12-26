import Request from '@/api/request'

export default {
  /* 登录接口 */
  getMenuList: (data: object): any => {
    return Request({ ...data }, '/logistics/menu/menuList')
  },
  saveMenu: (data: object) => {
    return Request({ ...data }, '/logistics/menu/saveMenu', 'post')
  },
  /* 获取一级菜单 */
  getFristMenu: (data: object = {}) => {
    return Request({ ...data }, '/logistics/menu/getFirstMenu')
  },
  /* 根据菜单id获取菜单信息 */
  getMenuDetailById: (data: object = {}) => {
    return Request({ ...data }, '/logistics/menu/getMenuDetailById')
  },
  /* 删除菜单 */
  deleteMenu: (data: object = {}) => {
    return Request({ ...data }, '/logistics/menu/deleteMenu')
  }
}
