import request from '@/utils/request'

export function getEssayByDate (params) {
  return request('get', 'api/article/day', params)
}

export function getRandomEssay (params) {
  return request('get', 'api/article/random', params)
}
