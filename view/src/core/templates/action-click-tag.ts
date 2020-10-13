import { defineTemplate } from '../define'

const help = /* html */ `
    點擊分頁的標籤，作為更換分頁使用。
`

export default defineTemplate({
    props: {
        value: {
            type: 'text',
            info: '目標',
            default: '1'
        }
    },
    template: {
        help,
        name: 'click-tag',
        type: 'action',
        btnText: '點擊標籤',
        info: '點擊標籤',
        color: 'red darken-2',
        display({ value }) {
            return `點擊 ${value} 號標籤`
        },
        validate({ value }) {
            let target = Number(value)
            if (isNaN(target)) {
                return '必須為數字'
            }
            if (target < 0) {
                return '必須大於1'
            }
            if (value === '') {
                return '必須填入標籤編號'
            }
            return true
        },
        write({ value }) {
            return `
                let handles = await browser.getAllWindowHandles()
                await browser.switchTo().window(handles[${Number(value) - 1}])
            `
        }
    }
})
