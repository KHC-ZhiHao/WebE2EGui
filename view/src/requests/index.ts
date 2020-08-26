import axios from './axios'
import { resolve, reject } from './response'

export default {
    async contact() {
        try {
            let result = await axios.post('public/contact')
            return resolve(result)
        } catch (e) {
            throw reject(e)
        }
    }
}
