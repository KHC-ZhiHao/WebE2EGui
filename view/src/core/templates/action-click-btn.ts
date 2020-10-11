import { defineTemplate } from '../define'

const help = `
    ### 點擊按鈕
    觸發指定文字內容的element click事件。
`

export default defineTemplate({
    props: {
        value: {
            type: 'text',
            info: '文字',
            default: ''
        }
    },
    template: {
        help,
        name: 'click-btn',
        type: 'action',
        btnText: '點擊按鈕',
        info: '點擊符合文字的按鈕',
        color: 'teal lighten-2',
        display({ value }) {
            return `點擊 ${value} 按鈕`
        },
        validate({ value }) {
            if (value === '') {
                return '沒有選擇對象'
            }
            return true
        },
        write({ value }) {
            return `await element(by.buttonText('${value}')).click()`
        }
    }
})