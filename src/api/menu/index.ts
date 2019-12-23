import Request from '@/api/request'

export default {
  /* 登录接口 */
  getMenuList: (data: object): any => {
    return Request({ ...data }, '/logistics/menu/menuList')
  },
  addMenu: (data: object) => {
    return Request({ ...data }, '/logistics/menu/addMenu', 'post')
  }
}
