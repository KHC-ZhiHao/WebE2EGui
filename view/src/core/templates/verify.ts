import selector from './cases/selector'

export default {
    name: 'verify',
    type: 'verify',
    btnText: '驗證文本',
    info: '驗證參數',
    props: {
        ...selector.props,
        verifyType: {
            type: 'radio-group',
            info: '選擇',
            options: [
                {
                    text: '應該是',
                    value: 'yes'
                },
                {
                    text: '不應該是',
                    value: 'no'
                }
            ],
            default: 'yes'
        },
        verify: {
            type: 'text',
            info: '目標',
            default: ''
        }
    },
    color: 'brown darken-1',
    display(props) {
        return `驗證 ${selector.display(props)} ${props.verifyType === 'no' ? '不應該是' : '應該是'} ${props.verify}`
    },
    validate(props) {
        return selector.validate(props)
    },
    write({ target, verifyType, verify, selector, index }) {
        let unit = ''
        if (selector === 'name') {
            unit = `element(by.name('${target}')).getText()`
        }
        if (selector === 'query') {
            unit = `await (await $$('${target}'))[${index}].getText()`
        }
        if (verifyType === 'no') {
            return `await expect(${unit}).not.toEqual('${verify}')`
        } else {
            return `await expect(${unit}).toEqual('${verify}')`
        }
    }
}
