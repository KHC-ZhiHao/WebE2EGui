import { defineTemplate } from '../define'

const help = /* html */ `
    使用 axios 發送請求，意味著 response 是指 axios 的 response，且同時須注意整個程式是在 Protractor 執行而不是瀏覽器。
`

export default defineTemplate({
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
    template: {
        help,
        name: 'http',
        type: 'engineer',
        btnText: '發送請求',
        info: '像API發出請求，只限回傳JSON格式',
        color: 'orange darken-4',
        display({ title }) {
            return `基於 ${title} 發出請求`
        },
        validate({ uri, headers, body, query, response }) {
            if (uri.match('http') == null) {
                return 'Uri 不存在 http，請使用 https:// 作為開頭。'
            }
            try {
                eval('var __verify__ = ' + headers)
            } catch (error) {
                return `Header 語法表達錯誤，請使用 JSON 格式。(${error.message})`
            }
            try {
                eval('var __verify__ = ' + body)
            } catch (error) {
                return `Body 語法表達錯誤，請使用 JSON 格式。(${error.message})`
            }
            try {
                eval('var __verify__ = ' + query)
            } catch (error) {
                return `Query 語法表達錯誤，請使用 JSON 格式。(${error.message})`
            }
            if (response.trim().slice(0, 5) !== 'async') {
                return 'Response 的回乎函數請採用 Async Function。'
            }
            return true
        },
        write({ method, uri, headers, body, query, response }) {
            if (method === 'get' || method === 'delete') {
                return /* javascript */ `
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
                return /* javascript */ `
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
})
