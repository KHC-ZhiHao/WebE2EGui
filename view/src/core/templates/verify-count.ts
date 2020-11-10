import { defineTemplate } from '../define'

const help = /* html */ `
    如果你的 Element 是動態產生的，此方法可以驗證你指向的 Query Selector 有多少個。
`

export default defineTemplate({
    props: {
        selector: {
            type: 'text',
            info: 'query selector',
            default: '.'
        },
        count: {
            type: 'text',
            info: 'query',
            default: ''
        }
    },
    template: {
        help,
        name: 'count',
        type: 'verify',
        btnText: '驗證數量',
        info: '驗證query數量',
        color: 'brown darken-1',
        display({ selector, count }) {
            return `驗證Element ${selector} 有 ${count} 個`
        },
        validate({ selector, count }) {
            let result = Number(count)
            if (isNaN(result)) {
                return '必須為數字'
            }
            if (selector === '') {
                return '必須指定 selector 對象'
            }
            return true
        },
        write({ selector, count }) {
            return `
                await expect($$(\`${selector}\`).count()).toBe(${count})
            `
        }
    }
})
