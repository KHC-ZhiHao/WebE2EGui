import AlasCore from 'alas'
import MsPackage from 'alas/packages/ms'
import Status from './status'
import * as Action from './action'

import * as Project from './project/index'
import * as Actions from './actions/index'

type Containers = {
    project: Project.Container,
    actions: Actions.Container
}

export const alas: AlasCore<Containers> = new AlasCore()
export const status = Status
export const action = Action

alas.setLocale('zh-tw')
alas.addPackage(MsPackage)
alas.addContainer('project', Project.Container)
alas.addContainer('actions', Actions.Container)

export default alas
