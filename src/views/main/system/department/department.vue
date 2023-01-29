<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="pageContentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    >
      <template #leader="scope"
        ><span style="color: red">{{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">{{ scope.row[scope.prop] }} </template>
    </page-content>
    <page-dialog
      :dialog-config="dialogConfigRef"
      ref="pageDialogRef"
    ></page-dialog>
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'
import useMain from '@/stores/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'

const dialogConfigRef = computed(() => {
  const mainStore = useMain()
  const departments: any = mainStore.entiredepartments.map((item) => ({
    label: item.name,
    value: item.id
  }))
  dialogConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return dialogConfig
})

// content
const { handleQueryClick, handleResetClick, pageContentRef } = usePageContent()
// diglog
const { handleNewClick, handleEditClick, pageDialogRef } = usePageDialog()
</script>

<style scoped></style>
