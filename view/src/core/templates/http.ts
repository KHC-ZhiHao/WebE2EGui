export default {
    name: 'http',
    type: 'engineer',
    btnText: '發送請求',
    info: '像API發出請求，只限回傳JSON格式',
    props: {
        title: {
            type: 'text',
            info: '標題',
            default: ''
        },
        method: {
            type: 'radio-group',
            info: 'method',
            options: [
                {
                    text: 'GET',
                    value: 'GET'
                },
                {
                    text: 'POST',
                    value: 'POST'
                },
                {
                    text: 'PUT',
                    value: 'PUT'
                },
                {
                    text: 'DELETE',
                    value: 'DELETE'
                }
            ],
            default: 'GET'
        },
        uri: {
            type: 'text',
            info: 'uri',
            default: 'https://'
        },
        headers: {
            type: 'javascript',
            info: 'header',
            default: '{}'
        },
        query: {
            type: 'javascript',
            info: 'query',
            default: '{}'
        },
        body: {
            type: 'javascript',
            info: 'body',
            default: '{}'
        },
        response: {
            type: 'javascript',
            info: 'response',
            default: 'async (response) => { /* 驗證邏輯 */ }'
        }
    },
    color: 'deep-orange darken-4',
    display({ title }) {
        return `基於 ${title} 發出請求`
    },
    write({ method, uri, headers, body, query, response }) {
        return `
            try {
                let request = require('request-promise')
                let result = await request({
                    method: '${method}',
                    uri: '${uri}',
                    qs: ${query},
                    headers: ${headers},
                    body: ${body},
                    json: true
                })
                await (${response})(result)
            } catch(e) {
                throw e
            }
        `
    }
}
