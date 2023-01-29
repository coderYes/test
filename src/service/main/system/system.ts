import hjRequest from '@/service'

export function postUserListDate(queryInfo: any) {
  return hjRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hjRequest.delete({
    url: '/users/' + id
  })
}

export function newUserData(data: any) {
  return hjRequest.post({
    url: '/users',
    data
  })
}

export function editUserData(id: number, data: any) {
  return hjRequest.patch({
    url: `/users/${id}`,
    data
  })
}
// getPageUrl
/**
 * 针对页面的网络请求: CRUD
 * @param pageName 页面的名字
 * @param queryInfo 查询的信息
 * @returns 返回
 */
export function postPageListData(pageName: string, queryInfo: any) {
  return hjRequest.post({
    url: `${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return hjRequest.delete({
    url: `${pageName}/${id}`
  })
}

export function newPageData(pageName: string, queryInfo: any) {
  return hjRequest.post({
    url: `/${pageName}`,
    data: queryInfo
  })
}
export function editPageData(pageName: string, id: number, payload: any) {
  return hjRequest.patch({
    url: `/${pageName}/${id}`,
    data: payload
  })
}
