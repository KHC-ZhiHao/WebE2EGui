import { defineTemplate } from '../define'

const help = /* html */ `
    等待指定的毫秒數，模擬使用者操作時不會即時反應的行為。
`

export default defineTemplate({
    props: {
        value: {
            type: 'text',
            info: '毫秒',
            default: '1000'
        }
    },
    template: {
        help,
        name: 'wait',
        type: 'action',
        btnText: '等待',
        info: '等待',
        color: 'purple accent-1',
        display({ value }) {
            return `等待 ${value} 毫秒`
        },
        validate({ value }) {
            let result = Number(value)
            if (isNaN(result)) {
                return '必須為數字'
            } else {
                return true
            }
        },
        write(data) {
            return `await browser.sleep(${data.value})`
        }
    }
})
