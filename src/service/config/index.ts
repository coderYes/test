// 区分开发环境
// export const BASE_URL = 'http://152.136.185.210:5000'
// export const BASE_URL = 'http://152.136.185.210:4000'

// console.log(import.meta.env.DEV)
// console.log(import.meta.env.PROD)
// console.log(import.meta.env.SSR)

export const TIME_OUT = 10000
let BASE_URL = ''
if (import.meta.env.MODE === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://152.136.185.210:4000'
}

console.log(BASE_URL)

export { BASE_URL }
