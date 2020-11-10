import { defineTemplate } from '../define'
import { props, validate, display } from '../mixins/selector'

const help = /* html */ `
    <ul>
        <li>系統點擊: 觸發element的click事件。</li>
        <li>模擬滑鼠點擊: 模擬鼠標在element上點擊，更符合使用者操作。</li>
    </ul>
`

export default defineTemplate({
    props: Object.assign({
        action: {
            type: 'radio-group',
            info: '情境',
            options: [
                {
                    text: '系統點擊',
                    value: 'system'
                },
                {
                    text: '模擬滑鼠點擊',
                    value: 'mouse'
                }
            ],
            default: 'system'
        }
    }, props),
    template: {
        help,
        name: 'click',
        type: 'action',
        btnText: '點擊',
        info: '點擊',
        color: 'red darken-2',
        display({ action, selector, target, index }) {
            return `${action === 'system' ? '系統點擊' : '模擬滑鼠點擊'} ${display({ selector, target, index })}`
        },
        validate({ selector, index }) {
            return validate({ selector, index })
        },
        write({ selector, target, index, action }) {
            if (action === 'system') {
                if (selector === 'name') {
                    return `await element(by.name(\`${target}\`)).click()`
                }
                if (selector === 'query') {
                    return `await (await $$(\`${target}\`))[${index}].click()`
                }
            } else {
                if (selector === 'name') {
                    return `await browser.actions().mouseMove(await element(by.name(\`${target}\`))).click().perform()`
                }
                if (selector === 'query') {
                    return `await browser.actions().mouseMove((await $$(\`${target}\`))[${index}]).click().perform()`
                }
            }
        }
    }
})
