<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystem from '@/stores/main/system/system'
const centerDialogVisible = ref(false)
interface IProps {
  dialogConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()
// 初始化值
const initialData: any = {}
for (const item of props.dialogConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
console.log(formData)
// 1. 拿到数据遍历
const systemStore = useSystem()
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
    console.log(editData.value)
  } else {
    for (const key in formData) {
      const item = props.dialogConfig.formItems.find(
        (item) => item.prop === key
      )

      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
// 3. 确认点击
function handleConfirmClick() {
  centerDialogVisible.value = false // 隐藏对话框
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (handleEditDialog.value && editData.value) {
    // 编辑用户
    systemStore.editPageDataAction(
      props.dialogConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 发送请求, 创建用户
    systemStore.newPageDataAction(props.dialogConfig.pageName, infoData)
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
    :title="
      handleEditDialog
        ? dialogConfig.header.editTitle
        : dialogConfig.header.newTitle
    "
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px">
        <template v-for="item in dialogConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- <component :is="'el-' + item.type"></component> -->
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                type="daterange"
                v-model="formData[item.prop]"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>

            <template v-if="item.type === 'select'">
              <el-select
                :style="{ width: '100%' }"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                size="large"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :value="option.value" :label="option.label" />
                </template>
              </el-select>
            </template> </el-form-item
        ></template>
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
