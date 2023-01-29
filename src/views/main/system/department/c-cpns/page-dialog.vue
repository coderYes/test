<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMain from '@/stores/main/main'
import useSystem from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
const centerDialogVisible = ref(false)

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
// 1. 拿到数据遍历
const mainStore = useMain()
const systemStore = useSystem()
const { entiredepartments } = storeToRefs(mainStore)
const handleEditDialog = ref()
const editData = ref()
// 2. 控制对话框的显示和隐藏
function showDialog(handle = false, payload?: any) {
  centerDialogVisible.value = true
  handleEditDialog.value = handle
  if (handle && payload) {
    for (const key in formData) {
      formData[key] = payload[key]
    }
    editData.value = payload
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
// 3. 确认点击
function handleConfirmClick() {
  centerDialogVisible.value = false // 隐藏对话框
  if (handleEditDialog.value && editData.value) {
    // 编辑用户
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 发送请求, 创建用户
    systemStore.newPageDataAction('department', formData)
  }
}
defineExpose({
  showDialog
})
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    destroy-on-close
    :title="handleEditDialog ? '编辑部门' : '新建部门'"
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="部门" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input
            v-model="formData.leader"
            placeholder="请输入部门领导"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select
            v-model="formData.parentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in entiredepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
.el-dialog {
  .form {
    padding: 0 20px;
  }
}
</style>
