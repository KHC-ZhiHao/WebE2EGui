export default {
    name: 'play-sound',
    type: 'system',
    btnText: '播放聲音',
    info: '選擇選項',
    props: {},
    color: 'green darken-1',
    display() {
        return `播放聲音`
    },
    write() {
        return `
            console.log('@event:play-sound')
        `
    }
}
