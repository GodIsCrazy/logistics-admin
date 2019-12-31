import Request from '@/api/request'

export default {
  /* 获取角色列表数据 */
  getRoleListPage: (data: object): any => {
    return Request({ ...data }, '/logistics/role/roleListByPage')
  }
}
