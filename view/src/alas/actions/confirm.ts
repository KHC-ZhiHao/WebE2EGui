import { IModelOptions, IModel, IList } from 'alas'

type Callback = (done: () => void) => void

export interface Model extends IModel {
    open: boolean
    title: string
    $self: {
        confirm: Callback
    }
    $m: {
        open: (title: string, callback: Callback) => void
    }
}

export interface List extends IList<Model> {}

export const Options: IModelOptions<Model, List> = {
    body: {
        open: [],
        title: []
    },
    defs: {
        open: () => false
    },
    methods: {
        open(self, title, callback) {
            self.open = true
            self.title = title
            self.$self.confirm = () => callback(() => {
                self.open = false
                self.title = ''
            })
        }
    }
}
