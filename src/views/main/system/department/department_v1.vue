<template>
  <div class="department">
    <page-search
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    >
    </page-content>
    <page-dialog ref="pageDialogRef"></page-dialog>
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'

import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageDialog from './c-cpns/page-dialog.vue'
const pageContentRef = ref<InstanceType<typeof PageContent>>()
// search
function handleQueryClick(queryInfo: any) {
  pageContentRef.value?.featchPageListData(queryInfo)
}
function handleResetClick() {
  pageContentRef.value?.featchPageListData()
}
// content
const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
function handleNewClick() {
  pageDialogRef.value?.showDialog()
}

function handleEditClick(payload: any) {
  pageDialogRef.value?.showDialog(true, payload)
}
</script>

<style scoped></style>
