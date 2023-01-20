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

export default function mapMenuToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // 4.2 根据菜单匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
    }
  }
  return routes
}
