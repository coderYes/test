import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import 'normalize.css'
import './assets/css/index.less'
import registerIcons from './global/register-icons'
import { localCache } from './utils/cache'
import mapMenuToRoutes from './utils/map-menu'

const app = createApp(App)

app.use(pinia.use(createPersistedState()))

const loginLocal = localCache.getCache('pinia-login')
if (loginLocal) {
  const routes = mapMenuToRoutes(loginLocal.userMenus)
  routes.forEach((route) => router.addRoute('main', route))
}

// app.use(ElementPlus)
app.use(router)
app.use(registerIcons)
app.mount('#app')
