import config from '../../config.json'
import { IList } from 'alas'

export function getConfig() {
    return config
}

export function readFileText(file: File): Promise<string> {
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.onload = event => resolve(event.target.result as string)
        reader.readAsText(file)
    })
}

export function copy(text: string) {
    let textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.innerText = text
    textarea.select()
    textarea.focus()
    document.execCommand('copy')
    textarea.remove()
}

export function swapArray(list: IList<any>, index1, index2) {
    list.items[index1] = list.items.splice(index2, 1, list.items[index1])[0]
}

export function indexUp(list: IList<any>, index) {
    if (index + 1 != list.size) {
        swapArray(list, index, index + 1)
    }
}

export function indexDown(list: IList<any>, index) {
    if (index !== 0) {
        swapArray(list, index, index - 1)
    }
}
