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
                    value: 'get'
                },
                {
                    text: 'POST',
                    value: 'post'
                },
                {
                    text: 'PUT',
                    value: 'put'
                },
                {
                    text: 'DELETE',
                    value: 'delete'
                }
            ],
            default: 'get'
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
        if (method === 'get' || method === 'delete') {
            return /* javascript */`
                try {
                    let axios = require('axios')
                    let result = await axios['${method}']('${uri}', {
                        params: ${query},
                        headers: ${headers}
                    })
                    await (${response})(result)
                } catch(e) {
                    throw e
                }
            `
        } else {
            return /* javascript */`
                try {
                    let axios = require('axios')
                    let result = await axios['${method}']('${uri}', ${body}, {
                        headers: ${headers}
                    })
                    await (${response})(result)
                } catch(e) {
                    throw e
                }
            `
        }
    }
}
