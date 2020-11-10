import { props, display, validate } from '../mixins/selector'
import { defineTemplate } from '../define'

const help = /* html */ `
    方法如選項所見。
`

const modeOptions = [
    {
        text: '應該是',
        value: 'yes'
    },
    {
        text: '不應該是',
        value: 'no'
    },
    {
        text: '包含',
        value: 'like'
    },
    {
        text: '不包含',
        value: 'no-like'
    }
]

export default defineTemplate({
    props: Object.assign({
        mode: {
            type: 'radio-group',
            info: '條件',
            options: modeOptions,
            default: 'yes'
        },
        verify: {
            type: 'text',
            info: '驗證文本',
            default: ''
        },
    }, props),
    template: {
        name: 'verify',
        type: 'verify',
        info: '驗證參數',
        help,
        color: 'brown darken-1',
        btnText: '驗證文本',
        display({ target, mode, verify, selector, index }) {
            let { text } = modeOptions.find(e => e.value === mode)
            return `驗證 ${display({ selector, target, index })} ${text} ${verify}`
        },
        validate({ selector, index }) {
            return validate({ selector, index })
        },
        write({ target, mode, verify, selector, index }) {
            let type = ''
            let unit = ''
            if (selector === 'name') {
                unit = `element(by.name(\`${target}\`)).getText()`
            }
            if (selector === 'query') {
                unit = `await (await $$(\`${target}\`))[${index}].getText()`
            }
            if (mode === 'no') {
                type = 'not.toEqual'
            }
            if (mode === 'yes') {
                type = 'toEqual'
            }
            if (mode === 'like') {
                type = 'toMatch'
            }
            if (mode === 'no-like') {
                type = 'not.toMatch'
            }
            return `await expect(${unit}).${type}(\`${verify}\`)`
        }
    }
})
