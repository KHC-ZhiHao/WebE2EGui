export default {
    name: 'verify-tag',
    type: 'verify',
    btnText: '驗證標籤數量',
    info: '驗證標籤數量',
    props: {
        value: {
            type: 'text',
            info: '數量',
            default: '1'
        }
    },
    color: 'brown darken-1',
    display({ value }) {
        return `驗證標籤數量為 ${value}`
    },
    write({ value }) {
        return `
            let handles = await browser.getAllWindowHandles()
            await expect(handles.length).toEqual(${value})
        `
    }
}
