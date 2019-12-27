export default [
  {
    path: '/sysSetting/userManager',
    name: 'userManager',
    component: () => import('@/views/sysSetting/userManager/index.vue'),
    meta: {
      title: '用户管理'
    }
  }
]
