<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
</script>

<template>
  <div class="user">
    <div class="search">
      <user-search></user-search>
    </div>
    <div class="content">
      <div class="header">头部</div>
      <div class="table">表单</div>
      <div class="pagenition">分页</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
