import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menu'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 1.获取所有的路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   }
// ]
// // 2.动态的添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

router.beforeEach((to) => {
  const loginInfo = localCache.getCache('pinia-login')
  if (to.path.startsWith('/main') && !loginInfo?.token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
