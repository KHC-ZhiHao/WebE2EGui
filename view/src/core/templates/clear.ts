import selector from './cases/selector'

export default {
    name: 'clear',
    type: 'action',
    btnText: '清空',
    info: '清空數值',
    props: selector.props,
    color: 'blue darken-2',
    display(props) {
        return `清空 ${selector.display(props)} 的數值`
    },
    validate(props) {
        return selector.validate(props)
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
