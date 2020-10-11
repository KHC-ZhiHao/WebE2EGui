import { defineTemplate } from '../define'

const help = `
    ### 回上一頁
`

export default defineTemplate({
    props: {},
    template: {
        help,
        name: 'back',
        type: 'system',
        btnText: '上一頁',
        info: '觸發瀏覽器回到上一頁',
        color: 'green darken-2',
        display() {
            return `觸發瀏覽器回到上一頁`
        },
        validate() {
            return true
        },
        write() {
            return `await browser.navigate().back()`
        }
    }
})
