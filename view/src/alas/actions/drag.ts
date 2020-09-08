import * as Step from '@/alas/project/step'
import * as Template from '@/alas/project/template'
import { IModelOptions, IModel, IList } from 'alas'

export interface Model extends IModel {
    template: Template.Model
    templateTarget: {
        step: Step.Model
        index: number
        template: Template.Model
    }
    $v: {
        readonly draging: boolean
    }
    $m: {
        startTemplate: (template: Template.Model) => void
        endTemplate: () => void
        enterTemplate: (data: { template: Template.Model, index: number, step: Step.Model }) => void
    }
}

export interface List extends IList<Model> {}

export const Options: IModelOptions<Model, List> = {
    body: {
        template: [],
        templateTarget: []
    },
    views: {
        draging(self) {
            return !!self.template
        }
    },
    methods: {
        startTemplate(self, template) {
            self.template = template
        },
        endTemplate(self) {
            if (self.templateTarget != null) {
                let { name, props } = self.template.$copy()
                let { step, index } = self.templateTarget
                step.templates.write({
                    name,
                    props
                }, {
                    insert: index + 1
                })
            }
            self.template = null
            self.templateTarget = null
        },
        enterTemplate(state, { template, index, step }) {
            state.templateTarget = {
                step,
                index,
                template
            }
        }
    }
}
