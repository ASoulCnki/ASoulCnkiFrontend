// 用于后续分布式枝网准备工作
export const serverInfo = [
  {
    name: '枝网',
    // ensure url end with /
    url: process.env.VUE_APP_BASE_API || 'https://asoulcnki.asia/',
    select: true
  }
]