export default {
    name: 'set-path',
    type: 'system',
    btnText: '設置網址',
    info: '設置網址',
    props: {
        value: {
            type: 'text',
            info: '網址',
            default: ''
        }
    },
    color: 'blue-grey darken-1',
    display({ value }) {
        return `前往 ${value}`
    },
    write({ value }) {
        return `await browser.driver.get('${value}')`
    }
}
