import { defineStore } from 'pinia'
import {
  AccountLogin,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
import mapMenuToRoutes from '@/utils/map-menu'
export const LOGIN_TOKEN = 'login/token'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

export default defineStore('login', {
  // 指定类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async AccountLoginAction(payload: IAccount) {
      // 1. 登录
      const res = await AccountLogin(payload)
      if (res.code !== 0) {
        return ElMessage.error(res.response.data)
      }
      const id = res.data.id
      this.token = res.data.token
      localCache.setCache(LOGIN_TOKEN, res.data.token)
      // 2. 获取用户详情信息
      const user = await getUserInfoById(id)
      this.userInfo = user.data

      // 3. 获取角色菜单树
      const menus = await getUserMenusByRoleId(id)
      this.userMenus = menus.data
      // 4. 动态路由
      const routes = mapMenuToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 5. 跳转
      router.push('/main')
    }
  }
})
