import { defineTemplate } from '../define'

const help = `
    ### 驗證標籤數量
    由時候我們必須知道是否會開出分頁，可以用這個方法確認分頁的數量。
`

export default defineTemplate({
    props: {
        value: {
            type: 'text',
            info: '數量',
            default: '1'
        }
    },
    template: {
        name: 'verify-tag',
        type: 'verify',
        btnText: '驗證分頁數量',
        info: '驗證分頁數量',
        help,
        color: 'brown darken-1',
        display({ value }) {
            return `驗證分頁數量為 ${value}`
        },
        validate({ value }) {
            let result = Number(value)
            if (isNaN(result)) {
                return '必須為數字'
            } else {
                return true
            }
        },
        write({ value }) {
            return /* javascript */ `
                let handles = await browser.getAllWindowHandles()
                await expect(handles.length).toEqual(${value})
            `
        }
    }
})
