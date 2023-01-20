import hjRequest from '..'

/**
 * 登录接口
 * @param {String} - name 用户名
 * @param {String} - password 密码
 */
export function AccountLogin(account: IAccount) {
  return hjRequest.post<any>({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hjRequest.get({
    url: '/users/' + id
  })
}

export function getUserMenusByRoleId(id: number) {
  return hjRequest.get({
    url: `/role/${id}/menu`
  })
}
