export default {
    name: 'code',
    type: 'engineer',
    btnText: 'javascript',
    info: '直接編寫 protractor.js 程式碼',
    props: {
        title: {
            type: 'text',
            info: '標題',
            default: ''
        },
        value: {
            type: 'javascript',
            info: '程式碼',
            default: ''
        }
    },
    color: 'orange darken-4',
    display({ title }) {
        return `JavaScript : ${title}`
    },
    write({ value }) {
        return `
            try {
                ${value}
            } catch(e) {
                throw e
            }
        `
    }
}
