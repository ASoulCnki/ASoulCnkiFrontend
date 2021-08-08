import { instance } from '@/api';
import { parseTime } from './index'

export function request() {
  const getUrl = `/ranking/`;

  const notify = (s, type) => {
    this.$message({ showClose: true, message: s, type: type })
  }

  const params = {
    pageSize: 10,
    pageNum: this.pageNum
  }

  for (const param in this.stateSelect) {
    params[param] = this.stateSelect[param].value
  }

  instance.get(getUrl, {
    params: params
  })
    .then(res => {
      const data = res.data.data
      if (data.code) {
        this.response.articles = []
        return notify('服务器异常, 请稍后重试', 'error')
      }
      this.response = {
        allCount: data.all_count,
        timeRange: [
          parseTime(data.start_time, '{y}/{m}/{d} {h}:{i}'),
          parseTime(data.end_time, '{y}/{m}/{d} {h}:{i}')
        ],
        articles: handleArray(data.replies)
      }
    })
    .catch(err => {
      this.response.articles = []
      notify('服务器异常', 'error')
      throw new Error(err)
    })
    .finally(() => {
      this.totalPage = Math.ceil(this.response.allCount / 10)
    })
}

function handleArray(array) {
  if (!Array.isArray(array)) return []

  return array.map(x => {
    return {
      content: x.content,
      createTime: parseTime(x.ctime * 1000, '{y}/{m}/{d}').substr(2),
      id: x.dynamic_id,
      likeNum: x.like_num,
      author: {
        name: x.m_name,
        id: x.mid
      },
      originReplyId: x.origin_rpid,
      replyId: x.rpid,
      similarCount: x.similar_count,
      totalLikeSum: x.similar_like_sum,
      typeId: x.type_id,
      url: handleURL(x)
    }
  })
}

function handleURL(x) {

  // 有bug 动态的链接跳转会404
  const [baseUrl, dynamicBaseUrl] = [
    'https://www.bilibili.com',
    'https://t.bilibili.com'
  ]

  switch (x.type_id) {
    case 1:
      return `${baseUrl}/video/av${x.oid}/#reply${x.rpid}`
    case 11:
    case 17:
      return `${dynamicBaseUrl}/${x.dynamic_id}/#reply${x.rpid}`
    case 12:
      return `${baseUrl}/read/cv${x.oid}/#reply${x.rpid}`
    default:
      return ``
  }
}
