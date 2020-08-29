import Axios from 'axios'
import { getConfig } from '@/utils'

let { host, port } = getConfig()
let axios = Axios.create({
    baseURL: `${host}:${port}`
})

export async function read(name: string) {
    let result = await axios.post('read', { name })
    return result.data
}

export async function readdir(name: string) {
    let result = await axios.post('readdir', { name })
    return JSON.parse(result.data)
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