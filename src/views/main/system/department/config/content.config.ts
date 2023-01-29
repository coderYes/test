const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },

    { type: 'normal', label: '部门名称', prop: 'name', width: '200px' },
    { type: 'normal', label: '部门领导', prop: 'leader', width: '220px' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '200px' },

    {
      type: 'custom',
      label: '部门领导',
      prop: 'leader',
      width: '250px',
      slotName: 'leader'
    },
    {
      type: 'custom',
      label: '上级部门',
      prop: 'parentId',
      width: '250px',
      slotName: 'parent'
    },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '150px' }
  ]
}
export default contentConfig
