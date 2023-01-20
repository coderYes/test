import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { IAxiosConfig } from './type'

class HJRequest {
  instance: AxiosInstance
  constructor(config: IAxiosConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout
    })
    this.instance.interceptors.request.use(
      config.interceptors?.requestIntercptor,
      config.interceptors?.requestIntercptorError
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responsetIntercptor,
      config.interceptors?.requestIntercptorError
    )
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => err
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => err
    )
  }
  // 网络请求
  request<T = AxiosResponse>(config: IAxiosConfig<T>) {
    return new Promise<T>((resolve, reject) => {
      config.interceptors?.requestIntercptor &&
        (config = config.interceptors?.requestIntercptor(config))
      this.instance
        .request<any, T>({
          ...config
        })
        .then((res) => {
          config.interceptors?.responsetIntercptor &&
            (res = config.interceptors?.responsetIntercptor(res))
          // resolve(res as any as T);
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }
  get<T = AxiosResponse>(config: IAxiosConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = AxiosResponse>(config: IAxiosConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  patch<T = AxiosResponse>(config: IAxiosConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
  delete<T = AxiosResponse>(config: IAxiosConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default HJRequest
