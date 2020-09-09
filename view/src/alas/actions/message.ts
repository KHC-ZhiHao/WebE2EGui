import { IModelOptions, IModel, IList } from 'alas'

export type MessageType = 'error' | 'success' | 'warning'

export interface Model extends IModel {
    toasts: Array<{
        time: number
        type: MessageType
        remove: boolean
        clicked: boolean
        message:  string
    }>
    $m: {
        push: (type: MessageType, message: string) => void
        collecationToast: () => void
    }
}

export interface List extends IList<Model> {}

export const Options: IModelOptions<Model, List> = {
    body: {
        toasts: []
    },
    defs: {
        toasts: () => []
    },
    methods: {
        push(self, type, message) {
            self.toasts.push({
                time: 5,
                type: type,
                remove: false,
                clicked: false,
                message: message
            })
        },
        collecationToast(state) {
            state.toasts = state.toasts.filter(toast => toast.remove === false)
        }
    }
}
