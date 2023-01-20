import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 4.2 获取所有的路由对象存到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export default function mapMenuToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // 4.2 根据菜单匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1. 给route的顶层菜单添加重定向(但只需添加一个)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.二级菜单
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径匹配想要的菜单
 * @param path 需要匹配的路径
 * @param userMenus 映射的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
/**
 * 根据路径匹配想要的面包屑菜单
 * @param path 需要匹配的路径
 * @param userMenus 映射的菜单
 */
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push(menu)
        breadcrumbs.push(submenu)
      }
    }
  }
  return breadcrumbs
}
