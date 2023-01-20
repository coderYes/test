<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="left">
      <el-icon class="icon" @click="handleMenuIconClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <HeaderInfo />
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .left {
    display: flex;

    .icon {
      cursor: pointer;
    }
    .el-breadcrumb {
      margin-left: 10px;
    }
  }
}
</style>
