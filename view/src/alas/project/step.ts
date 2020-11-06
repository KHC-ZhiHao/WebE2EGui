import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

import * as Template from './template'

export type Output = {
    id: string
    tag: string
    name: string
    templates: Template.Output[],
    createdAt: number
    updatedAt: number
}

export interface Model extends IModel {
    id: string
    name: string
    createdAt: number
    updatedAt: number
    templates: Template.List
    $v: {
        tag: 'step'
        write: string
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
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        name: () => '',
        createdAt: () => Date.now(),
        updatedAt: () => Date.now()
    },
    refs: {
        templates: '[template]'
    },
    views: {
        tag() {
            return 'step'
        },
        write(self) {
            return ` 
                it('${self.name}', async function() {
                    console.log('執行 => ${self.name}')
                    await browser.sleep(120)
                    ${self.templates.v.write}
                })
            `
        },
        output(self) {
            if (self.$isChange()) {
                self.updatedAt = Date.now()
            }
            return {
                id: self.id,
                tag: self.$v.tag,
                name: self.name,
                templates: self.templates.v.output,
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