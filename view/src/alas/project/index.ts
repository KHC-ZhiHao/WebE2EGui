import { IContainerOptions, IContainer, IContainerModel } from 'alas'
import * as Project from './project'
import * as Spec from './spec'
import * as Step from './step'
import * as Group from './group'
import * as Variable from './variable'
import * as Template from './template'
import * as CustomBtn from './customBtn'
import * as Dependencie from './dependencie'

export interface Container extends IContainer {
    models: {
        project: IContainerModel<Project.Model, Project.List>
        step: IContainerModel<Step.Model, Step.List>
        spec: IContainerModel<Spec.Model, Spec.List>
        group: IContainerModel<Group.Model, Group.List>
        variable: IContainerModel<Variable.Model, Variable.List>
        template: IContainerModel<Template.Model, Template.List>
        customBtn: IContainerModel<CustomBtn.Model, CustomBtn.List>
        dependencie: IContainerModel<Dependencie.Model, Dependencie.List>
    }
}

export const Container: IContainerOptions<Container> = {
    models: {
        project: Project.Options,
        step: Step.Options,
        spec: Spec.Options,
        group: Group.Options,
        variable: Variable.Options,
        template: Template.Options,
        customBtn: CustomBtn.Options,
        dependencie: Dependencie.Options
    }
}
