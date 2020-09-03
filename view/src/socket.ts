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
        let id = await axios.post('exec', { script })
        let channel = this.io.on(id, ({ type, data }) => {
            if (type === 'exit') {
                callback('exit', null)
                channel.close()
            } else {
                callback('data', data)
            }
        })
    }
}

export default new Socket()
