import { defineTemplate } from '../define'

const help = /* html */ `
    操作目前網域的localstorage。
`

export default defineTemplate({
    props: {
        mode: {
            type: 'radio-group',
            info: '操作方法',
            options: [
                {
                    text: 'write',
                    value: 'write'
                },
                {
                    text: 'remove',
                    value: 'remove'
                },
                {
                    text: 'clear',
                    value: 'clear'
                }
            ],
            default: 'write'
        },
        key: {
            type: 'text',
            info: 'key',
            show: props => props.mode !== 'clear',
            default: ''
        },
        value: {
            type: 'text',
            info: 'value',
            show: props => props.mode === 'write',
            default: ''
        }
    },
    template: {
        help,
        name: 'localstorage',
        type: 'system',
        btnText: 'storage',
        info: '操作Local Storage',
        color: 'green darken-1',
        display({ mode, key, value }) {
            if (mode === 'clear') {
                return 'Local Storage : 清空'
            }
            if (mode === 'write') {
                return `Local Storage : 寫入 ${key} : ${value}`
            }
            if (mode === 'remove') {
                return `Local Storage : 刪除 ${key}`
            }
        },
        validate({ mode, key }) {
            if (mode !== 'clear' && key === '') {
                return 'Key 不能為空'
            }
            return true
        },
        write({ mode, key, value }) {
            if (mode === 'clear') {
                return `await browser.executeScript('window.localStorage.clear();')`
            }
            if (mode === 'write') {
                return `await browser.executeScript(\`window.localStorage.setItem('${key}', '${value}');\`)`
            }
            if (mode === 'remove') {
                return `await browser.executeScript(\`window.localStorage.removeItem('${key}');\`)`
            }
        }
    }
})
