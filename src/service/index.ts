import type { AxiosHeaders } from 'axios'
import HJRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
const hjRequest = new HJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercptor(config) {
      const loginInfo = localCache.getCache('pinia-login')
      console.log('loginInfo', loginInfo)
      if (config.headers && loginInfo?.token) {
        ;(config.headers as AxiosHeaders).set('Authorization', loginInfo.token)
      }
      return config
    }
  }
})

export default hjRequest
