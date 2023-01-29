<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogCOnfig from './config/dialog.config'

import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'

import useMain from '@/stores/main/main'
import { mapMenuListToIds } from '@/utils/map-menu'
const mainStore = useMain()
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
const { pageDialogRef, handleEditClick, handleNewClick } =
  usePageDialog(editCallback)
const otherInfo = ref({})
function handleElTreeCheck(current: any, keys: any) {
  const menuList = [...keys.checkedKeys, ...keys.halfCheckedKeys]
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(data: any) {
  nextTick(() => {
    const menus = mapMenuListToIds(data.menuList)
    treeRef.value?.setCheckedKeys(menus)
  })
}
</script>

<template>
  <div class="role">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
      :content-config="contentConfig"
    ></page-content>
    <page-dialog
      ref="pageDialogRef"
      :other-info="otherInfo"
      :dialog-config="dialogCOnfig"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="mainStore.entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-dialog>
  </div>
</template>

<style scoped lang="less"></style>
