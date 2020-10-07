import { defineTemplate } from '../define'

const help = `
    ### 驗證 Element 是否存在
    指定 Element Name 屬性，驗證是否存在與否。
`

export default defineTemplate({
    props: {
        target: {
            type: 'text',
            info: 'Element Name',
            default: ''
        },
        verifyType: {
            type: 'radio-group',
            info: '選擇',
            options: [
                {
                    text: '應該存在',
                    value: 'yes'
                },
                {
                    text: '不該存在',
                    value: 'no'
                }
            ],
            default: 'yes'
        }
    },
    template: {
        help,
        name: 'verify-has',
        type: 'verify',
        btnText: '存在',
        info: '是否存在',
        color: 'brown darken-1',
        display({ target, verifyType }) {
            return `驗證 ${target} ${verifyType === 'yes' ? '必須存在' : '不該存在'}`
        },
        validate({ target }) {
            if (target === '') {
                return '目標不存在'
            }
            return true
        },
        write({ target, verifyType }) {
            let unit = `await browser.isElementPresent(element(by.name('${target}')))`
            if (verifyType === 'no') {
                return `await expect(${unit}).toBe(false)`
            } else {
                return `await expect(${unit}).toBe(true)`
            }
        }
    }
})
