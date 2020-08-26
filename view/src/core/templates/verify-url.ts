export default {
    name: 'verify-url',
    type: 'verify',
    btnText: '驗證網址',
    info: '驗證網址',
    props: {
        mode: {
            type: 'radio-group',
            info: '驗證模式',
            options: [
                {
                    text: 'like',
                    value: 'like'
                },
                {
                    text: 'no like',
                    value: 'no like'
                },
                {
                    text: 'match',
                    value: 'match'
                }
            ],
            default: 'like'
        },
        verify: {
            type: 'text',
            info: '應該是',
            default: ''
        }
    },
    color: 'cyan lighten-1',
    display({ mode, verify }) {
        return `驗證網址 ${mode} ${verify}`
    },
    write({ mode, verify }) {
        if (mode === 'no like') {
            return `await expect(await browser.getCurrentUrl()).not.toMatch('${verify}')`
        } else if (mode === 'like') {
            return `await expect(await browser.getCurrentUrl()).toMatch('${verify}')`
        } else {
            return `await expect(await browser.getCurrentUrl()).toEqual('${verify}')`
        }
    }
}
