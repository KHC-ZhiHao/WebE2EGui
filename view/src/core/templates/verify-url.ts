import { defineTemplate } from '../define'

const help = /* html */ `
    <ul>
        <li>包含: 指定內容出現在網址的某一部分。</li>
        <li>不含: 指定內容不存在網址內。</li>
        <li>完全符合: 網址需跟指定內容完全相符。</li>
    </ul>
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
        verify: {
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
        display({ mode, verify }) {
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
            return `驗證網址 ${type} ${verify}`
        },
        validate({ verify }) {
            if (!verify) {
                return '找不到內容'
            }
            return true
        },
        write({ mode, verify }) {
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
                await expect(await browser.getCurrentUrl()).${type}('${verify}')
            `
        }
    }
})
