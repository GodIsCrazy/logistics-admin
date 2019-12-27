export default [
  {
    path: '/sysSetting/MenuManager',
    name: 'MenuManager',
    component: () => import('@/views/sysSetting/menuManager/index.vue'),
    meta: {
      title: '菜单管理'
    }
  },
  {
    path: '/sysSetting/roleManager',
    name: 'MenuManager',
    component: () => import('@/views/sysSetting/roleManager/index.vue'),
    meta: {
      title: '角色管理'
    }
  }
]
