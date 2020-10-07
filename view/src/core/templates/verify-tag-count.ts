export default {
    name: 'count',
    type: 'verify',
    btnText: '驗證數量',
    info: '驗證query數量',
    props: {
        selector: {
            type: 'text',
            info: 'query selector',
            default: '.'
        },
        count: {
            type: 'text',
            info: 'query',
            default: '1'
        }
    },
    color: 'brown darken-1',
    display({ selector, count }) {
        return `驗證 ${selector} 有 ${count} 個`
    },
    write({ selector, count }) {
        return `await expect($$('${selector}').count()).toBe(${count})`
    }
}
