import { defineTemplate } from '../define'

const help = /* html */ `
    直接編寫 Protractor(https://www.protractortest.org) 程式碼，如果要使用變數請使用 browser.params。
`

export default defineTemplate({
    props: {
        title: {
            type: 'text',
            info: '標題',
            default: ''
        },
        value: {
            type: 'javascript',
            info: '程式碼(不支援變數)',
            default: ''
        }
    },
    template: {
        help,
        name: 'code',
        type: 'engineer',
        btnText: 'javascript',
        info: '直接編寫 protractor.js 程式碼',
        color: 'orange darken-4',
        display({ title }) {
            return `JavaScript : ${title}`
        },
        validate() {
            return true
        },
        write({ value }) {
            return /* javascript */ `
                try {
                    ${value}
                } catch(e) {
                    throw e
                }
            `
        }
    }
})
