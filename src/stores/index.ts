import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import useLogin from '@/stores/login/login'

function registerStore(app: App) {
  app.use(createPinia().use(createPersistedState()))
  const loginStore = useLogin()
  loginStore.loadLocalCacheAction()
}
export default registerStore
