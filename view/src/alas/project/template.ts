import core from '@/core'
import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

export type Output = {
    id: string
    tag: string
    name: string
    props: string
    createdAt: number
    updatedAt: number
}

export interface Model extends IModel {
    id: string
    name: string
    props: any
    createdAt: number
    updatedAt: number
    $v: {
        tag: 'template'
        write: string
        output: Output
    }
}

export interface List extends IList<Model> {
    v: {
        write: string
        output: Output[]
    }
}

export const Options: IModelOptions<Model, List> = {
    body: {
        id: [],
        name: [],
        props: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        name: () => 'set-path',
        props: () => {},
        createdAt: () => Date.now(),
        updatedAt: () => Date.now()
    },
    views: {
        tag() {
            return 'template'
        },
        write(self) {
            let target = core.templates[self.name]
            let write = target.write(self.props)
            let display = target.display(self.props)
            let project = self.$parent.$parent.$parent
            for (let variable of project.variables.items) {
                write = write.replace(new RegExp(`{${variable.key}}`, 'g'), variable.value)
                display = display.replace(new RegExp(`{${variable.key}}`, 'g'), variable.value)
            }
            return `
                await (async() => {
                    console.log('動作 => ${display}')
                    ${write}
                    await browser.sleep(100)
                })()
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
                props: self.props,
                createdAt: self.createdAt,
                updatedAt: self.updatedAt
            }
        }
    },
    list: {
        key: model => model.id,
        views: {
            write(list) {
                return list.items.map(s => s.$v.write.trim()).join('\n')
            },
            output(list) {
                return list.items.map(s => s.$v.output)
            }
        }
    }
}