import { props, validate, display } from '../mixins/selector'
import { defineTemplate } from '../define'

const help = /* html */ `
    指定對象如果是輸入欄，則清空內容。
`

export default defineTemplate({
    props: props,
    template: {
        help,
        name: 'clear',
        type: 'action',
        btnText: '清空',
        info: '清空輸入欄內容',
        color: 'red darken-2',
        display({ selector, target, index }) {
            return `清空 ${display({ selector, target, index })} 輸入欄內的數值`
        },
        validate({ selector, index }) {
            return validate({ selector, index })
        },
        write({ selector, target, index }) {
            if (selector === 'name') {
                return `await element(by.name('${target}')).clear()`
            }
            if (selector === 'query') {
                return `
                    let element = await $$('${target}')
                    element[${index}].clear()
                `
            }
        }
    }
})
