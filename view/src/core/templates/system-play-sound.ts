import { defineTemplate } from '../define'

const help = /* html */ `
    從電腦發出聲音，提示正在滑手機的你是否看看有需要注意或手動操作的地方。
`

export default defineTemplate({
    props: {},
    template: {
        help,
        name: 'play-sound',
        type: 'system',
        btnText: '播放聲音',
        info: '播放聲音',
        color: 'green darken-1',
        display() {
            return `播放聲音`
        },
        validate() {
            return true
        },
        write() {
            return `
                console.log('@event:play-sound')
            `
        }
    }
})