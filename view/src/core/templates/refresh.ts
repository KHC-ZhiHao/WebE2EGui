export default {
    name: 'refresh',
    type: 'system',
    btnText: '重整當前頁面',
    info: '重整當前頁面',
    props: {},
    color: 'blue-grey lighten-1',
    display() {
        return `重整當前頁面`
    },
    write() {
        return `await browser.refresh()`
    }
}
