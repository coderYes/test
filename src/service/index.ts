import type { AxiosHeaders } from 'axios'
import HJRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/stores/login/login'
const hjRequest = new HJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercptor(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        ;(config.headers as AxiosHeaders).set('Authorization', token)
      }
      return config
    }
  }
})

export default hjRequest
