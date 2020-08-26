export default {
    name: 'polling',
    type: 'verify',
    btnText: '輪詢',
    info: '等待直到條件符合為止',
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
                    text: 'page-count',
                    value: 'page-count'
                },
                {
                    text: 'URL',
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
                    text: 'like',
                    value: 'like'
                },
                {
                    text: 'unlike',
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
    color: 'teal lighten-2',
    display({ selector, mode, value, timeout, target, index }) {
        let modeText = mode === 'greater' ? '>=' : mode
        return `在 ${timeout} 毫秒內輪詢 ${selector} ${target}${selector === 'query' ? '(' + index + ')' : ''} ${modeText} ${value}`
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
