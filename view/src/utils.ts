import config from '../../config.json'
import { IList } from 'alas'

export function getConfig() {
    return config
}

export function copy(text: string) {
    var textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.innerText = text
    textarea.select()
    textarea.focus()
    document.execCommand('copy')
    textarea.remove()
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

export function swapArray(list: IList<any>, index1, index2) {
    list.items[index1] = list.items.splice(index2, 1, list.items[index1])[0]
}
