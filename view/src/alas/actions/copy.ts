import * as Spec from '@/alas/project/spec'
import * as Step from '@/alas/project/step'
import * as Template from '@/alas/project/template'
import { action } from '@/alas'
import { IModelOptions, IModel, IList } from 'alas'

export interface Model extends IModel {
    step: Step.Model
    templates: Template.Model[]
    $m: {
        copyTemplate: (template: Template.Model) => void
        removeTemplate: (index: number) => void
        pasteTemplate: (data: { step: Step.Model, index: number, insert: number }) => void
        copyStep: (step: Step.Model) => void
        pasteStep: (data: { spec: Spec.Model, index: number }) => void
    }
}

export interface List extends IList<Model> {}

export const Options: IModelOptions<Model, List> = {
    body: {
        step: [],
        templates: []
    },
    defs: {
        templates: () => []
    },
    methods: {
        copyTemplate(self, template) {
            self.templates.push(template.$copy())
            action.message('success', '成功加入剪貼簿')
        },
        removeTemplate(self, index) {
            self.templates.splice(index, 1)
        },
        pasteTemplate(self, { step, index, insert }) {
            let { name, props } = self.templates[index].$copy()
            step.templates.write({
                name,
                props
            }, {
                insert: insert + 1
            })
        },
        copyStep(self, step) {
            self.step = step
            action.message('success', '複製成功')
        },
        pasteStep(self, { spec, index }) {
            let { name, templates } = self.step.$copy()
            spec.steps.write({
                name: name,
                templates: templates.items.map(s => ({
                    name: s.name,
                    props: s.props
                }))
            }, {
                insert: index
            })
            self.step = null
        }
    }
}
