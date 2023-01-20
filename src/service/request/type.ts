import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface IAxiosConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IInterceptors<T>
}

interface IInterceptors<T = AxiosResponse> {
  requestIntercptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestIntercptorError?: (err: any) => any
  responsetIntercptor?: (res: T) => T
  responsetIntercptorError?: (err: any) => any
}
