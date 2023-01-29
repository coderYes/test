<script setup lang="ts">
import useSystem from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emit = defineEmits(['newClick', 'editClick'])
// 1. 发起action 请求userlist的data
const systemStore = useSystem()
// 2. 获取数据展示
const { userList } = storeToRefs(systemStore)
// 3. 页面相关
const currentPage = ref(1)
const pageSize = ref(10)
// 当前页改变触发
const handleCurrentChange = () => {
  featchUserListDate()
}
// 当前显示个数改变
const handleSizeChange = () => {
  currentPage.value = 1
  featchUserListDate()
}

// 4. 发送请求函数
function featchUserListDate(payload: any = {}) {
  // 1. 数据处理
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset, ...payload }
  // 2. 发送求情
  systemStore.postUserListAction(info)
}

// 5. 删除操作
function handleDelteClick(payload: any) {
  systemStore.deleteUserByIdAction(payload.id)
}
// 编辑
function handleEditClick(payload: any) {
  // featchUserListDate()
  emit('editClick', payload)
}
function handleNewUserClick() {
  emit('newClick')
}
featchUserListDate()
defineExpose({
  featchUserListDate
})
</script>

<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" />
        <el-table-column align="center" type="index" label="#" />
        <el-table-column align="center" prop="name" label="用户名" />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="enable"
          label="状态"
          width="100px"
        >
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>{{
              scope.row.enable ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          width="250px"
          prop="createAt"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="250px"
          label="更新时间"
          prop="updateAt"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template></el-table-column
        >
        <el-table-column align="center" label="操作" width="160px">
          <template #default="scope">
            <el-button
              @click="handleEditClick(scope.row)"
              size="small"
              icon="Edit"
              text
              type="primary"
              >编辑</el-button
            >
            <el-button
              size="small"
              @click="handleDelteClick(scope.row)"
              icon="Delete"
              text
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="sizes, prev, pager, next, jumper,total"
        :total="systemStore.userTotalCount"
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
