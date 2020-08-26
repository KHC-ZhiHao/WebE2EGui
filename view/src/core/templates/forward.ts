export default {
    name: 'forward',
    type: 'system',
    btnText: '下一頁',
    info: '點擊瀏覽器的下一頁',
    props: {},
    color: 'green darken-1',
    display() {
        return `點擊瀏覽器的下一頁`
    },
    write() {
        return `await browser.navigate().forward()`
    }
}
