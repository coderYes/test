<script setup lang="ts">
import { reactive } from 'vue'

const formLabelAlign = reactive({
  account: '',
  password: ''
})
</script>

<template>
  <div class="phone-panel">
    <el-form label-width="60px" :model="formLabelAlign">
      <el-form-item label="手机号:">
        <el-input v-model="formLabelAlign.account" />
      </el-form-item>
      <el-form-item label="验证码:">
        <el-input
          :style="{ width: '58%', marginRight: '5px' }"
          v-model="formLabelAlign.password"
        />
        <el-button type="primary">发送信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.phone-panel {
  color: red;
}
</style>
