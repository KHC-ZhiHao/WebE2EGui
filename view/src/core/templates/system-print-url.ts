import { defineTemplate } from '../define'

const help = /* html */ `
    輸出當下網址。
`

export default defineTemplate({
    props: {},
    template: {
        help,
        name: 'print-url',
        type: 'system',
        btnText: '輸出網址',
        info: '輸出網址',
        color: 'green darken-1',
        display() {
            return `輸出網址`
        },
        validate() {
            return true
        },
        write() {
            return `console.log(await browser.getCurrentUrl())`
        }
    }
})
