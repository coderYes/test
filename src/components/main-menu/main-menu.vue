<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import useLogin from '@/stores/login/login'
import { mapPathToMenu } from '@/utils/map-menu'
withDefaults(
  defineProps<{
    isFold: boolean
  }>(),
  {
    isFold: false
  }
)
const loginStore = useLogin()
const route = useRoute()
const pathMenu = computed(() => mapPathToMenu(route.path, loginStore.userMenus))
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="login-logo" />
      <h2 class="title" v-show="!isFold">cms-ts</h2>
    </div>
    <el-menu
      :default-active="pathMenu.url"
      text-color="#b7bdc3"
      active-text-color="#fff"
      router
      :collapse="isFold"
      background-color="#001529"
    >
      <template v-for="item in loginStore.userMenus" :key="item.id">
        <el-sub-menu :index="item.url">
          <template #title>
            <el-icon><component :is="item.icon.split('-icon-')[1]" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 子选项 -->
          <template v-for="child in item.children" :key="child.id">
            <el-menu-item :index="child.url">
              <span>{{ child.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      color: #fff;
      line-height: 0;
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
