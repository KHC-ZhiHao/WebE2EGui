export default {
    props: {
        selector: {
            type: 'radio-group',
            info: '選擇',
            options: [
                {
                    text: 'name',
                    value: 'name'
                },
                {
                    text: 'query',
                    value: 'query'
                }
            ],
            default: 'name'
        },
        target: {
            type: 'text',
            info: '對象',
            default: ''
        },
        index: {
            type: 'text',
            show: ({ selector }) => selector === 'query',
            info: '第幾個(0指的是第一個)',
            default: '0'
        }
    },
    validate({ selector, index }) {
        if (selector === 'name') {
            return true
        }
        let result = Number(index)
        if (isNaN(result)) {
            return '必須為數字'
        }
        if (Number.isInteger(result) === false) {
            return '必須為整數'
        }
        return true
    },
    display({ selector, target, index }) {
        return `${selector} -> ${target} ${selector === 'query' ? '(第' + (Number(index) + 1) + '個)' : ''}`
    }
}