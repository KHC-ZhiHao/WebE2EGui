import selector from './cases/selector'

export default {
    name: 'select',
    type: 'action',
    btnText: '選擇選項',
    info: '選擇選項',
    props: {
        ...selector.props,
        value: {
            type: 'text',
            info: '為',
            default: ''
        }
    },
    color: 'deep-purple lighten-1',
    display(props) {
        return `選擇選項 ${selector.display(props)} 為 ${props.value}`
    },
    validate(props) {
        return selector.validate(props)
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
