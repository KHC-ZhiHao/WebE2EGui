import selector from './cases/selector'

export default {
    name: 'key-in',
    type: 'action',
    btnText: '輸入',
    info: '輸入數值',
    props: {
        ...selector.props,
        value: {
            type: 'text',
            info: '為',
            default: ''
        }
    },
    color: 'blue darken-1',
    display(props) {
        return `輸入 ${selector.display(props)} 為 ${props.value}`
    },
    validate(props) {
        return selector.validate(props)
    },
    write({ selector, target, value, index }) {
        if (selector === 'name') {
            return `await element(by.name('${target}')).sendKeys('${value}')`
        }
        if (selector === 'query') {
            return `await (await $$('${target}'))[${index}].sendKeys('${value}')`
        }
    }
}
