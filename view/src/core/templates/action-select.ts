import { props, display, validate } from '../mixins/selector'
import { defineTemplate } from '../define'

const help = /* html */ `
    點擊 Select 標籤的 Option 對象。
`

export default defineTemplate({
    props: Object.assign({
        value: {
            type: 'text',
            info: '內容',
            default: ''
        }
    }, props),
    template: {
        help,
        name: 'select',
        type: 'action',
        btnText: '選擇選項',
        info: '選擇選項',
        color: 'red darken-2',
        display({ selector, target, index, value }) {
            return `選擇選項 ${display({ selector, target, index })} Option 內容為 ${value}`
        },
        validate({ selector, index, value }) {
            let error = validate({ selector, index })
            if (error !== true) {
                return error
            }
            if (value === '') {
                return '選擇目標不存在'
            }
            return true
        },
        write({ selector, target, value, index }) {
            if (selector === 'name') {
                return `await element(by.name('${target}')).element(by.cssContainingText('option', '${value}')).click()`
            }
            if (selector === 'query') {
                return `await (await $$('${target}'))[${index}].element(by.cssContainingText('option', '${value}')).click()`
            }
        }
    }
})
