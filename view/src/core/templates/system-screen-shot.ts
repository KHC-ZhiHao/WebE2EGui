import { defineTemplate } from '../define'

const help = /* html */ `
    拍攝當下的瀏覽器畫面。
`

export default defineTemplate({
    props: {},
    template: {
        help,
        name: 'screen-shot',
        type: 'system',
        btnText: '快照',
        info: '顯示螢幕快照',
        color: 'green darken-1',
        display() {
            return `顯示螢幕快照`
        },
        validate() {
            return true
        },
        write() {
            return `console.log('@image:' + await browser.takeScreenshot())`
        }
    }
})
