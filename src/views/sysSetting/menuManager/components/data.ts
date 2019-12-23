/**
 * @params prop 对应数据字段名称
 * @params label 表头显示的名称
 * @params width 列的宽度
 * @params minWidth 列的最小宽度,width&minWidth设置一个即可，根据情况设置
 * @params type {date:时间类型,enum: 枚举{value:枚举需要的map},money:金钱，icon:需要图标的}
 *  */
export default [
  {
    prop: 'name',
    label: '菜单名称',
    minWidth: '160'
  }, {
    prop: 'path',
    label: '菜单路径',
    minWidth: '200'
  }, {
    prop: 'remark',
    label: '备注',
    minWidth: '100'
  }, {
    prop: 'state',
    label: '状态',
    icon: true,
    width: '90',
    type: 'enum',
    value: {
      'ENABLED': '启用',
      'DISABLED': '禁用'
    }
  },
  {
    prop: 'updateTime',
    label: '最近更新时间',
    minWidth: '160',
    type: 'date'
  }
]
