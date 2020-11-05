import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

export type Output = {
    width: number
    height: number
    posX: number
    posY: number
    openConsole: boolean
}

export interface Model extends IModel {
    id: string
    name: string
    script: string
    createdAt: number
    updatedAt: number
    $v: {
        tag: 'customBtn'
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
        script: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        name: () => null,
        script: () => '',
        createdAt: () => Date.now(),
        updatedAt: () => null
    },
    views: {
        tag() {
            return 'customBtn'
        },
        output(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            return {
                id: self.id,
                tag: self.$v.tag,
                name: self.name,
                script: self.script,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt
            }
        }
    },
    list: {
        key: model => model.name,
        views: {
            output(self) {
                return self.items.map(s => s.$v.output)
            }
        }
    }
}
