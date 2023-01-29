<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMain from '@/stores/main/main'
import useSystem from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
const centerDialogVisible = ref(false)

const formData = reactive<any>({
  name: '',
  realname: '',
  cellphone: '',
  password: '',
  roleId: '',
  departmentId: ''
})
// 1. 拿到数据遍历
const mainStore = useMain()
const systemStore = useSystem()
const { entireRoels, entiredepartments } = storeToRefs(mainStore)
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
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 发送请求, 创建用户
    systemStore.newDateInfoAction(formData)
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
    :title="handleEditDialog ? '编辑用户' : '新建用户'"
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="formData.realname"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-show="!handleEditDialog">
          <el-input
            v-model="formData.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input
            v-model="formData.cellphone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="formData.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <template v-for="role in entireRoels" :key="role.id">
              <el-option :label="role.name" :value="role.id" />
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            v-model="formData.departmentId"
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
