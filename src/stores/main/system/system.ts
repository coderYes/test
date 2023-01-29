import { defineStore } from 'pinia'
import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListDate
} from '@/service/main/system/system'
import useMain from '@/stores/main/main'
interface ISystemState {
  userList: any[]
  userTotalCount: number

  pageList: any[]
  pageTotalCount: number
}
export default defineStore('system', {
  state(): ISystemState {
    return {
      userList: [],
      userTotalCount: 0,

      pageList: [],
      pageTotalCount: 0
    }
  },
  actions: {
    async postUserListAction(payload: any) {
      const res = await postUserListDate(payload)
      const { list, totalCount } = res.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1. 删除数据
      await deleteUserById(id)
      // 2. 重新请求数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newDateInfoAction(data: any) {
      await newUserData(data)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, payload: any) {
      await editUserData(id, payload)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    /** 针对页面数据的: CRUD */
    async postPageListAction(pageName: string, queryInfo: any) {
      console.log(pageName, queryInfo)
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount ?? list.length
      const mainStore = useMain()
      mainStore.fetchEntireDataAction()
    },
    async deletePageByIdAction(pageName: string, id: number) {
      await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMain()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const mainStore = useMain()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, payload: any) {
      await editPageData(pageName, id, payload)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const mainStore = useMain()
      mainStore.fetchEntireDataAction()
    }
  }
})
