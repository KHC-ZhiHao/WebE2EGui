import status from './status'

export const message = (type: 'error' | 'success' | 'warning', message: string) => {
    status.fetch('message').$m.push(type, message)
}

export const confirm = (title: string, callback: (done: () => void) => void) => {
    status.fetch('confirm').$m.open(title, callback)
}
