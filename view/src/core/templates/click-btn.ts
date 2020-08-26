export default {
    name: 'click-btn',
    type: 'action',
    btnText: '點擊按鈕',
    info: '點擊符合文字的按鈕',
    props: {
        value: {
            type: 'text',
            info: '文字',
            default: ''
        }
    },
    color: 'teal lighten-2',
    display({ value }) {
        return `點擊 ${value} 按鈕`
    },
    write({ value }) {
        return `await element(by.buttonText('${value}')).click()`
    }
}
