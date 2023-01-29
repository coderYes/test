import hjRequest from '@/service'

export function getAmountListData() {
  return hjRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return hjRequest.get({
    url: '/goods/category/count'
  })
}
export function getGoodsCategorySale() {
  return hjRequest.get({
    url: '/goods/category/sale'
  })
}
