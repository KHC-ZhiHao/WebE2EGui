import selector from './cases/selector'

export default {
    name: 'click',
    type: 'action',
    btnText: '點擊',
    info: '點擊',
    props: {
        ...selector.props,
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
    },
    color: 'lime darken-4',
    display(props) {
        return `${props.action === 'system' ? '系統點擊' : '模擬滑鼠點擊'} ${selector.display(props)}`
    },
    validate(props) {
        return selector.validate(props)
    },
    write({ selector, target, index, action }) {
        if (action === 'system') {
            if (selector === 'name') {
                return `await element(by.name('${target}')).click()`
            }
            if (selector === 'query') {
                return `await (await $$('${target}'))[${index}].click()`
            }
        } else {
            if (selector === 'name') {
                return `await browser.actions().mouseMove(await element(by.name('${target}'))).click().perform()`
            }
            if (selector === 'query') {
                return `await browser.actions().mouseMove((await $$('${target}'))[${index}]).click().perform()`
            }
        }
    }
}
