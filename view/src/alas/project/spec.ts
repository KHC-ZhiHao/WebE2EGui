import * as Step from './step'
import * as Template from './template'
import { v4 as uuidv4 } from 'uuid'
import { IModelOptions, IModel, IList } from 'alas'

export type Output = {
    id: string
    tag: string
    name: string
    desc: string
    group: string
    steps: Step.Output[]
    parent: string
    createdAt: number
    updatedAt: number
}

export interface Model extends IModel {
    id: string
    name: string
    desc: string
    steps: Step.List
    group: string
    parent: string
    createdAt: number
    updatedAt: number
    $v: {
        tag: 'spec'
        typeAndName: string
        steps: Step.Model[]
        templates: Template.Model[]
        write: string
        output: Output
    }
}

export interface List extends IList<Model> {
    v: {
        output: Output[]
        hasNoCategory: boolean
    }
}

export const Options: IModelOptions<Model, List> = {
    body: {
        id: [],
        desc: [],
        name: [],
        group: [],
        parent: [],
        createdAt: [],
        updatedAt: []
    },
    defs: {
        id: () => uuidv4(),
        desc: () => '',
        createdAt: () => Date.now(),
        updatedAt: () => Date.now()
    },
    refs: {
        steps: '[step]'
    },
    views: {
        tag() {
            return 'spec'
        },
        typeAndName(self) {
            let group = self.$parent.groups.fetch(self.group)
            return group ? group.name + ' - ' + self.name : self.name
        },
        steps(self) {
            let output = self.steps.items
            if (self.parent) {
                let parent = self.$parent.specs.fetch(self.parent)
                if (parent) {
                    output = parent.$v.steps.concat(output)
                }
            }
            return output
        },
        templates(self) {
            let output = []
            self.steps.forEach(sprite => {
                output = output.concat(sprite.templates.items)
            })
            return output
        },
        write(self) {
            let desc = self.desc.replace('`', '\\`')
            let steps = self.$v.steps
            return `
                const store = {}
                describe('${self.name}', function() {
                    beforeAll(async () => {
                        await browser.sleep(500)
                        console.log('測試 => ${self.name}')
                        console.log(\`說明 => \n${desc}\`)
                        await browser.sleep(500)
                    })

                    beforeEach(async() => {
                        await browser.waitForAngularEnabled(false)
                        await browser.sleep(1000)
                    })

                    ${steps.map(s => s.$v.write).join('\n\n')}

                    it('done', () => {
                        console.log('執行完畢')
                    })
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
                desc: self.desc,
                group: self.group,
                steps: self.steps.v.output,
                parent: self.parent,
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
            },
            hasNoCategory(list) {
                return list.items.filter(s => s.group == null).length > 0
            }
        }
    }
}