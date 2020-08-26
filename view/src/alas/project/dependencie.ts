import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

export type Output = {
    id: string
    tag: string
    name: string
    version: string
    createdAt: number
    updatedAt: number
}

export interface Model extends IModel {
    id: string
    name: string
    version: string
    createdAt: number
    updatedAt: number
    $v: {
        tag: 'dependencie'
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
        name: [],
        version: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        name: () => null,
        version: () => 'latest',
        createdAt: () => Date.now(),
        updatedAt: () => null
    },
    views: {
        tag() {
            return 'dependencie'
        },
        output(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            return {
                id: self.id,
                tag: self.$v.tag,
                name: self.name,
                version: self.version,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt
            }
        }
    },
    list: {
        key: model => model.id,
        views: {
            output(self) {
                return self.items.map(s => s.$v.output)
            }
        }
    }
}
