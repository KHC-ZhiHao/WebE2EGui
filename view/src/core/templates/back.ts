export default {
    name: 'back',
    type: 'system',
    btnText: '上一頁',
    info: '點擊瀏覽器的上一頁',
    props: {},
    color: 'green darken-2',
    display() {
        return `點擊瀏覽器的上一頁`
    },
    write() {
        return `await browser.navigate().back()`
    }
}
