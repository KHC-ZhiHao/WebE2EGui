import Axios from 'axios'
import { getConfig } from '@/utils'

let { host, port } = getConfig()

export const axios = Axios.create({
    baseURL: `http://${host}:${port}/`
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
    let result = await axios.post('write', { text, indentSize })
    return result.data
}
