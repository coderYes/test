import { defineStore } from 'pinia'
import {
  AccountLogin,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import mapMenuToRoutes from '@/utils/map-menu'
import { ElMessage } from 'element-plus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

export default defineStore('login', {
  // 指定类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async AccountLoginAction(payload: IAccount) {
      // 1. 登录
      const res: any = await AccountLogin(payload)
      console.log(res, 'res')
      if (res.code !== 0) {
        return ElMessage.error(res.response.data)
      }
      this.token = res.data.token
      // 2. 获取用户详情信息
      const user = await getUserInfoById(res.data.id)
      this.userInfo = user.data

      // 3. 获取角色菜单树
      const menus = await getUserMenusByRoleId(res.data.id)
      this.userMenus = menus.data
      // 4. 动态路由
      const routes = mapMenuToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 5. 跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      const loginLocal = localCache.getCache('pinia-login')
      if (loginLocal) {
        const routes = mapMenuToRoutes(loginLocal.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
