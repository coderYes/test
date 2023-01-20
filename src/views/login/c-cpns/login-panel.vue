<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AccountPanel from './account-panel.vue'
import PhonePanel from './phone-panel.vue'
import { localCache } from '@/utils/cache'
const isRemPwd = ref(false)
const currentName = ref('account')
const AccountPanelRef = ref<InstanceType<typeof AccountPanel>>()
const handleLoginClick = () => {
  if (currentName.value === 'account') {
    AccountPanelRef.value?.loginActions()
  }
}
onMounted(() => {
  const account = localCache.getCache('user-pwd')
  if (account) {
    isRemPwd.value = true
  }
})
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentName">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>帐号登录</span>
          </span>
        </template>
        <account-panel ref="AccountPanelRef"></account-panel>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <phone-panel></phone-panel>
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox
        v-model="isRemPwd"
        @change="AccountPanelRef?.isSavePwd($event)"
        label="记住密码"
        size="large"
      />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      size="large"
      :style="{ width: '100%' }"
      type="primary"
      @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
  }
  .custom-tabs-label {
    span {
      margin: 0 5px;
      margin-bottom: 3px;
    }
  }
  .control-account {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > .el-button {
    margin-top: 10px;
  }
}
</style>
