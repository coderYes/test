<script setup lang="ts">
import { mapPathToBreadcrumbs } from '@/utils/map-menu'
import useLogin from '@/stores/login/login'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const loginStore = useLogin()
const route = useRoute()
let breadcrumbs = computed(() =>
  mapPathToBreadcrumbs(route.path, loginStore.userMenus)
)
</script>

<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in breadcrumbs" :key="item.key">
      <el-breadcrumb-item :to="{ path: item.url }">{{
        item.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="less"></style>
