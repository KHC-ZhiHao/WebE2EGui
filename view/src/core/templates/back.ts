export default {
    name: 'back',
    type: 'system',
    btnText: '上一頁',
    info: '觸發瀏覽器回到上一頁',
    props: {},
    color: 'green darken-2',
    display() {
        return `觸發瀏覽器回到上一頁`
    },
    write() {
        return `await browser.navigate().back()`
    }
}
