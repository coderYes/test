<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

import useSystem from '@/stores/main/system/system'

import usePermission from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['newClick', 'editClick'])

const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)

// 1. 发起action 请求userlist的data
const systemStore = useSystem()
// 监听action动作
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'editPageDataAction' ||
      name === 'postPageListAction' ||
      name === 'deletePageByIdAction'
    ) {
      currentPage.value = 1
    }
  })
})
// 2. 获取数据展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 3. 页面相关
const currentPage = ref(1)
const pageSize = ref(10)
// 当前页改变触发
const handleCurrentChange = () => {
  featchPageListData()
}
// 当前显示个数改变
const handleSizeChange = () => {
  currentPage.value = 1
  featchPageListData()
}

// 4. 发送请求函数
function featchPageListData(payload: any = {}) {
  if (!isQuery) return
  // 1. 数据处理
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset, ...payload }
  // 2. 发送求情
  systemStore.postPageListAction(props.contentConfig.pageName, info)
}

// 5. 删除操作
function handleDelteClick(payload: any) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, payload.id)
}
// 编辑
function handleEditClick(payload: any) {
  // featchPageListData()
  emit('editClick', payload)
}
function handleNewUserClick() {
  emit('newClick')
}

featchPageListData()

defineExpose({
  featchPageListData
})
</script>

<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.label">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" :label="item.label">
              <template #default="scope">
                <el-button
                  @click="handleEditClick(scope.row)"
                  size="small"
                  icon="Edit"
                  text
                  v-if="isUpdate"
                  type="primary"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  @click="handleDelteClick(scope.row)"
                  icon="Delete"
                  v-if="isDelete"
                  text
                  type="danger"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" :label="item.label">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="sizes, prev, pager, next, jumper,total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .el-table {
    .el-button {
      margin: 0;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
