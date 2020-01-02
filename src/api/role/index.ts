import Request from '@/api/request'

export default {
  /* 获取角色列表数据 */
  getRoleListPage: (data: object): any => {
    return Request({ ...data }, '/logistics/role/roleListByPage')
  },
  /* 新增或者修改 */
  saveRole: (data: object): any => {
    return Request({ ...data }, '/logistics/role/saveRole', 'post')
  },
  /* 根据角色id获取角色信息 */
  getRoleDetailById: (data: object): any => {
    return Request({ ...data }, '/logistics/role/getRoleDetailById')
  },
  /* 删除角色 */
  deleteRoleById: (data: object): any => {
    return Request({ ...data }, '/logistics/role/deleteRoleById')
  }
}
