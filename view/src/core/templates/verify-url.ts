import { defineTemplate } from '../define'

const help = `
    ### 驗證網址是否符合需求
    * 包含 = 指定內容出現在網址的某一部分
    * 不含 = 指定內容不存在網址內
    * 完全符合 = 網址需跟指定內容完全相符
`

export default defineTemplate({
    props: {
        mode: {
            type: 'radio-group',
            info: '驗證模式',
            options: [
                {
                    text: '包含',
                    value: 'like'
                },
                {
                    text: '不含',
                    value: 'no-like'
                },
                {
                    text: '完全符合',
                    value: 'match'
                }
            ],
            default: 'like'
        },
        content: {
            type: 'text',
            info: '應該是',
            default: ''
        }
    },
    template: {
        name: 'verify-url',
        type: 'verify',
        btnText: '驗證網址',
        info: '驗證網址',
        color: 'brown darken-1',
        help,
        display({ mode, content }) {
            let type = ''
            if (mode === 'no-like') {
                type = '不包含'
            }
            if (mode === 'like') {
                type = '包含'
            }
            if (mode === 'match') {
                type = '完全符合'
            }
            return `驗證網址 ${type} ${content}`
        },
        validate({ content }) {
            if (!content) {
                return '找不到內容'
            }
            return true
        },
        write({ mode, content }) {
            let type = ''
            if (mode === 'no-like') {
                type = 'not.toMatch'
            }
            if (mode === 'like') {
                type = 'toMatch'
            }
            if (mode === 'match') {
                type = 'toEqual'
            }
            return /* javascript */ `
                await expect(await browser.getCurrentUrl()).${type}('${content}')
            `
        }
    }
})
