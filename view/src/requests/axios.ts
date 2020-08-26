import Axios from 'axios'
import config from '@/config'

let { baseURL } = config
let axios = Axios.create({
    baseURL
})

export default axios
