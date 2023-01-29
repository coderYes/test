import { ref } from 'vue'
import type PageDialog from '@/components/page-dialog/page-dialog.vue'
type EditFnType = (data: any) => void
function usePageDialog(editCallback?: EditFnType) {
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  function handleNewClick() {
    pageDialogRef.value?.showDialog()
  }

  function handleEditClick(payload: any) {
    pageDialogRef.value?.showDialog(true, payload)

    if (editCallback) {
      editCallback(payload)
    }
  }
  return {
    handleNewClick,
    handleEditClick,
    pageDialogRef
  }
}
export default usePageDialog
