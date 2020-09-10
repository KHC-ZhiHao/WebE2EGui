import { getConfig } from '@/utils'
import { axios } from '@/requests'
import io from 'socket.io-client'

const conifg = getConfig()

class Socket {
    io: any = null
    connect() {
        return new Promise(resolve => {
            this.io = io(`${conifg.host}:${conifg.port}`)
            this.io.on('connect', resolve)
        })
    }

    async exec(script: string, callback: (type: 'data' | 'exit', data: any) => void) {
        let { data } = await axios.post('exec', { script })
        let { id } = data
        let channel = this.io.on(id, ({ type, data }) => {
            if (type === 'exit') {
                callback('exit', null)
                channel.off(id)
            } else {
                callback('data', data)
            }
        })
    }
}

export default new Socket()
