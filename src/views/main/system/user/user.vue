<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userDialog from './c-cpns/user-dialog.vue'
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'

// content
const { handleQueryClick, handleResetClick, pageContentRef } = usePageContent()
// diglog
const { handleNewClick, handleEditClick, pageDialogRef } = usePageDialog()
</script>

<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
      ref="pageContentRef"
    ></user-content>
    <user-dialog ref="pageDialogRef" />
  </div>
</template>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
