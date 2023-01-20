import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import registerStore from './stores'
import registerIcons from './global/register-icons'

import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

app.use(registerIcons)
app.use(registerStore)
// app.use(ElementPlus)
app.use(router)
app.mount('#app')
