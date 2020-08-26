import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

export type Output = {
    id: string
    tag: string
    name: string
    level: number
    createdAt: number
    updatedAt: number
}

export interface Model extends IModel {
    id: string
    name: string
    level: number
    createdAt: number
    updatedAt: number
    $v: {
        tag: 'group'
        output: Output
    }
}

export interface List extends IList<Model> {
    v: {
        output: Output[]
    }
    m: {
        sort: () => void
    }
}

export const Options: IModelOptions<Model, List> = {
    body: {
        id: [],
        name: [],
        level: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        name: () => '',
        level: () => 0,
        createdAt: () => Date.now(),
        updatedAt: () => Date.now()
    },
    views: {
        tag() {
            return 'group'
        },
        output(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            return {
                id: self.id,
                tag: self.$v.tag,
                name: self.name,
                level: self.level,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt
            }
        }
    },
    list: {
        key: model => model.id,
        writeAfter(list) {
            list.methods.sort()
        },
        views: {
            output(list) {
                return list.items.map(s => s.$v.output)
            }
        },
        methods: {
            sort(list) {
                list.items.sort((a, b) => Number(a.level) > Number(b.level) ? -1 : 1)
            }
        }
    }
}