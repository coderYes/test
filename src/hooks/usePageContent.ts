import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // search
  function handleQueryClick(queryInfo: any) {
    pageContentRef.value?.featchPageListData(queryInfo)
  }
  function handleResetClick() {
    pageContentRef.value?.featchPageListData()
  }
  return {
    handleQueryClick,
    handleResetClick,
    pageContentRef
  }
}

export default usePageContent
