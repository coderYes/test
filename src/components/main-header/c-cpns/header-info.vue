<script setup lang="ts">
import router from '@/router'
import { localCache } from '@/utils/cache'

const handleLogoutClick = () => {
  localCache.removeCache('pinia-login')
  localCache.removeCache('pinia-system')
  localCache.removeCache('pinia-main')
  router.push('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <span
        ><el-icon><Message /></el-icon
      ></span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="25"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogoutClick">
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
  .operation {
    margin-top: 5px;
    span {
      margin: 0 5px;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .info {
    margin-left: 10px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
