import { defineTemplate } from '../define'

const help = `
    ### 重整
    重整當前頁面。
`

export default defineTemplate({
    props: {},
    template: {
        help,
        name: 'refresh',
        type: 'system',
        btnText: '重整當前頁面',
        info: '重整當前頁面',
        color: 'blue-grey lighten-1',
        display() {
            return `重整當前頁面`
        },
        validate() {
            return true
        },
        write() {
            return `await browser.refresh()`
        }
    }
})
