import request from '@/utils/request'

export function check(query) {
  return request({
    url: '/check',
    method: 'post',
    params: query
  })
}
