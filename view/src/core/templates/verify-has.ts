export default {
    name: 'verify-has',
    type: 'verify',
    btnText: '存在',
    info: '是否存在',
    props: {
        target: {
            type: 'text',
            info: '名稱',
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
    color: 'brown darken-1',
    display({ target, verifyType }) {
        return `驗證 ${target} ${verifyType === 'yes' ? '必須存在' : '不該存在'}`
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
