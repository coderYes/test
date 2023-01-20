<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  setTimeout(() => {
    router.go(-1)
  }, 3500)
})
</script>

<template>
  <div class="not-found">
    <h2>找不到对应的页面... 3s后返回首页</h2>
  </div>
</template>

<style scoped lang="less">
.not-found {
  display: flex;
  height: 100vh;
  color: pink;
  h2 {
    margin: auto;
  }
}
</style>
