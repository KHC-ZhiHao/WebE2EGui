export default {
    name: 'localstorage',
    type: 'system',
    btnText: 'storage',
    info: '操作Local Storafe',
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
    color: 'blue-grey darken-2',
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
    write({ mode, key, value }) {
        if (mode === 'clear') {
            return `await browser.executeScript('window.localStorage.clear();')`
        }
        if (mode === 'write') {
            return `await browser.executeScript('window.localStorage.setItem('${key}', '${value}');')`
        }
        if (mode === 'remove') {
            return `await browser.executeScript('window.localStorage.removeItem('${key}');')`
        }
    }
}
