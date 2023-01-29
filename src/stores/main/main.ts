import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'
interface IMainState {
  entireRoels: any[]
  entiredepartments: any[]
  entireMenus: any[]
}
export default defineStore('main', {
  state(): IMainState {
    return {
      entiredepartments: [],
      entireRoels: [],
      entireMenus: []
    }
  },
  actions: {
    async fetchEntireDataAction() {
      const departments = await getEntireDepartments()
      const roles = await getEntireRoles()
      const menus = await getEntireMenus()
      this.entireRoels = roles.data.list
      this.entiredepartments = departments.data.list
      this.entireMenus = menus.data.list
    }
  }
})
