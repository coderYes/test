import hjRequest from '..'

export function getEntireRoles() {
  return hjRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return hjRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return hjRequest.post({
    url: '/menu/list'
  })
}
