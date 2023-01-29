const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '50px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', label: '角色名称', width: '200px', prop: 'name' },
    { type: 'normal', label: '权限介绍', width: '300px', prop: 'intro' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '200px' }
  ]
}
export default contentConfig
