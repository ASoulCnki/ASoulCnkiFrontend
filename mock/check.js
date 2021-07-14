const Mock = require('mockjs')


const data = Mock.mock({
    'items|30': [{
        rate: '@increment'
    }]
})



module.exports = [
    {
        url: '/check',
        type: 'post',
        response: config => {
            const items = data.items
            return {
                code: 200,
                data: {
                    total: items.length,
                    items: items
                }
            }
        }
    }
]
