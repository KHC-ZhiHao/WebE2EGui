import { defineTemplate } from '../define'

const help = /* html */ `
    等待直到條件符合為止，等待時間過長代表錯誤。
`

export default defineTemplate({
    props: {
        selector: {
            type: 'radio-group',
            info: '選擇',
            options: [
                {
                    text: 'name',
                    value: 'name'
                },
                {
                    text: 'query',
                    value: 'query'
                },
                {
                    text: '分頁數量',
                    value: 'page-count'
                },
                {
                    text: '網址(URL)',
                    value: 'URL'
                }
            ],
            default: 'name'
        },
        mode: {
            type: 'radio-group',
            info: '條件',
            options: [
                {
                    text: '包含',
                    value: 'like'
                },
                {
                    text: '不包含',
                    value: 'unlike'
                },
                {
                    text: '大於',
                    value: 'greater'
                }
            ],
            default: 'like'
        },
        timeout: {
            type: 'text',
            info: '超時時間(ms)',
            default: '10000'
        },
        target: {
            type: 'text',
            info: '目標',
            show: ({ selector }) => selector !== 'URL',
            default: ''
        },
        value: {
            type: 'text',
            info: '為',
            default: ''
        },
        index: {
            type: 'text',
            show: ({ selector }) => selector === 'query',
            info: '第幾個(0指的是第一個)',
            default: '0'
        }
    },
    template: {
        help,
        name: 'polling',
        type: 'verify',
        btnText: '輪詢',
        info: '等待直到條件符合為止',
        color: 'brown darken-1',
        display({ selector, mode, value, timeout, target, index }) {
            let modeText = mode === 'greater' ? '>=' : mode
            return `在 ${timeout} 毫秒內輪詢 ${selector} ${target}${selector === 'query' ? '(' + index + ')' : ''} ${modeText} ${value}`
        },
        validate({ timeout, target, index }) {
            if (isNaN(Number(timeout))) {
                return '超時時間必須為數字'
            }
            if (target === '') {
                return '目標不存在'
            }
            if (isNaN(Number(index))) {
                return '第幾個必須為數字'
            }
            return true
        },
        write({ selector, mode, value, timeout, target, index }) {
            let select = ''
            let condition = ''
            if (selector === 'name') {
                select = `let result = await element(by.name('${target}')).getAttribute('value')`
            }
            if (selector === 'query') {
                select = `let result = await (awaut $$('${target}'))[${index}].getAttribute('value')`
            }
            if (selector === 'URL') {
                select = `let result = await browser.getCurrentUrl()`
            }
            if (mode === 'like') {
                condition = `
                    if (result.toString().match('${value}')) {
                        return true
                    }
                `
            }
            if (mode === 'unlike') {
                condition = `
                    if (!result.toString().match('${value}')) {
                        return true
                    }
                `
            }
            if (mode === 'greater') {
                condition = `
                    if (result.toString().length >= ${value}) {
                        return true
                    }
                `
            }
            return `
                await browser.wait(async() => {
                    ${select}
                    ${condition}
                }, ${timeout}, 'error')
            `
        }
    }
})
