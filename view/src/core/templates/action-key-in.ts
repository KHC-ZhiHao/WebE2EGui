import { defineTemplate } from '../define'
import { props, validate, display } from '../mixins/selector'

const help = /* html */ `
    對指定輸入框輸入文本。
`

export default defineTemplate({
    props: Object.assign({
        value: {
            type: 'text',
            info: '為',
            default: ''
        }
    }, props),
    template: {
        help,
        name: 'key-in',
        type: 'action',
        btnText: '輸入',
        info: '輸入數值',
        color: 'red darken-2',
        display({ value, selector, target, index }) {
            return `輸入 ${display({ selector, target, index })} 為 ${value}`
        },
        validate({ selector, index }) {
            return validate({ selector, index })
        },
        write({ selector, target, value, index }) {
            if (selector === 'name') {
                return `await element(by.name(\`${target}\`)).sendKeys(\`${value}\`)`
            }
            if (selector === 'query') {
                return `await (await $$(\`${target}\`))[${index}].sendKeys(\`${value}\`)`
            }
        }
    }
})
