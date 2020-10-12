import Axios from 'axios'
import { action } from '@/alas'
import { getConfig } from '@/utils'

let code = Date.now()
let { host, port } = getConfig()

export const axios = Axios.create({
    baseURL: `http://${host}:${port}/`
})
axios.interceptors.request.use(
    config => {
        config.headers['code'] = code
        return config
    }
)

axios.interceptors.response.use(async response => response, error => {
    action.message('error', error.response.data.error)
    return Promise.reject(error)
})

export async function remove(name: string) {
    await axios.post('remove', { name })
}

export async function read(name: string): Promise<string> {
    let result = await axios.post('read', { name })
    return result.data.data
}

export async function readdir(name: string): Promise<string[]> {
    let result = await axios.post('readdir', { name })
    return result.data.data
}

export async function mkdir(name: string) {
    await axios.post('mkdir', { name })
}

export async function rmdir(name: string) {
    await axios.post('rmdir', { name })
}

export async function write(path: string, content: string, beautify: boolean = false) {
    await axios.post('write', { path, content, beautify })
}

export async function beautify(text: string, indentSize: number) {
    let result = await axios.post('beautify', { text, indentSize })
    return result.data.data
}
