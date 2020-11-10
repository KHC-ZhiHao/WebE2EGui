import { defineTemplate } from '../define'

const help = /* html */ `
    前往指定的網址。
`

export default defineTemplate({
    props: {
        value: {
            type: 'text',
            info: '網址',
            default: ''
        }
    },
    template: {
        help,
        name: 'set-path',
        type: 'action',
        btnText: '前往',
        info: '前往',
        color: 'red darken-2',
        display({ value }) {
            return `前往 ${value}`
        },
        validate({ value }) {
            if (value === '') {
                return '網址不能為空'
            }
            return true
        },
        write({ value }) {
            return `await browser.driver.get(\`${value}\`)`
        }
    }
})
