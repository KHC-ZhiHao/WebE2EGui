import { defineTemplate } from '../define'

const help = /* html */ `
    點擊瀏覽器的下一頁。
`

export default defineTemplate({
    props: {},
    template: {
        help,
        name: 'forward',
        type: 'system',
        btnText: '下一頁',
        info: '點擊瀏覽器的下一頁',
        color: 'green darken-1',
        display() {
            return `點擊瀏覽器的下一頁`
        },
        validate() {
            return true
        },
        write() {
            return `await browser.navigate().forward()`
        }
    }
})
