import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

export type Output = {
    id: string
    tag: string
    key: string
    value: string
    createdAt: number
    updatedAt: number
}

export interface Model extends IModel {
    id: string
    key: string
    value: string
    createdAt: number
    updatedAt: number
    $v: {
        tag: 'variable'
        output: Output
    }
}

export interface List extends IList<Model> {
    v: {
        output: Output[]
    }
}

export const Options: IModelOptions<Model, List> = {
    body: {
        id: [],
        key: [],
        value: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        key: () => '',
        value: () => '',
        createdAt: () => Date.now(),
        updatedAt: () => Date.now()
    },
    views: {
        tag() {
            return 'variable'
        },
        output(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            return {
                id: self.id,
                tag: self.$v.tag,
                key: self.key,
                value: self.value,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt
            }
        }
    },
    list: {
        key: model => model.id,
        views: {
            output(list) {
                return list.items.map(s => s.$v.output)
            }
        }
    }
}
