import { defineTemplate } from '../define'

const help = `
    ### 模擬滾動
    滾動視窗到指定element或者是到達特定位置。
`

export default defineTemplate({
    props: {
        selector: {
            type: 'radio-group',
            info: '選擇',
            options: [
                {
                    text: 'name',
                    value: 'name'
                },
                {
                    text: 'position',
                    value: 'position'
                }
            ],
            default: 'name'
        },
        target: {
            type: 'text',
            info: '目標',
            show: ({ selector }) => selector === 'name',
            default: ''
        },
        positionX: {
            type: 'text',
            info: '座標x',
            show: ({ selector }) => selector === 'position',
            default: '0'
        },
        positionY: {
            type: 'text',
            info: '座標y',
            show: ({ selector }) => selector === 'position',
            default: '0'
        }
    },
    template: {
        help,
        name: 'scroll',
        type: 'action',
        btnText: '滾動',
        info: '滾動頁面至指定位置',
        color: 'light-green darken-1',
        display({ selector, target, positionX, positionY }) {
            if (selector === 'name') {
                return `滾動畫面至 name : ${target}`
            } else {
                return `滾動畫面至座標 (${positionX}, ${positionY})`
            }
        },
        validate({ selector, target, positionX, positionY }) {
            if (selector === 'name') {
                if (target === '') {
                    return '找不到目標'
                }
                return true
            } else {
                if (isNaN(Number(positionX))) {
                    return 'X座標必須為數字'
                }
                if (isNaN(Number(positionY))) {
                    return 'Y座標必須為數字'
                }
                return true
            }
        },
        write({ selector, target, positionX, positionY }) {
            if (selector === 'name') {
                return `await browser.executeScript('(document.getElementsByName(\\'${target}\\'))[0].scrollIntoView()')`
            } else {
                return `await browser.executeScript('window.scrollTo(${positionX}, ${positionY})')`
            }
        }
    }
})
