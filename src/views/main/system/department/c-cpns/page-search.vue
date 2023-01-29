<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
const emit = defineEmits(['queryClick', 'resetClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  createAt: '',
  leader: ''
})

const handleResetFormClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}

const handlerQueryFormClick = () => {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="user-search">
    <el-form ref="formRef" label-width="80px" size="large" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              placeholder="请输入查询的部门名称"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              placeholder="请输入查询的部门领导"
              v-model="searchForm.leader"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              v-model="searchForm.createAt"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 重置,搜索 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetFormClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handlerQueryFormClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
