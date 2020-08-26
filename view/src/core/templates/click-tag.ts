export default {
    name: 'click-tag',
    type: 'action',
    btnText: '點擊標籤',
    info: '點擊標籤',
    props: {
        value: {
            type: 'text',
            info: '目標',
            default: '1'
        }
    },
    color: 'red darken-2',
    display({ value }) {
        return `點擊 ${value} 號標籤`
    },
    write({ value }) {
        return `
            let handles = await browser.getAllWindowHandles()
            await browser.switchTo().window(handles[${Number(value) - 1}])
        `
    }
}
