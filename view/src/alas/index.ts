import AlasCore from 'alas'
import MsPackage from 'alas/packages/ms'
import Status from './status'

import * as Project from './project'
import * as Actions from './actions'

type Containers = {
    project: Project.Container,
    actions: Actions.Container
}

export const alas: AlasCore<Containers> = new AlasCore()
export const status = Status
export const message = status.fetch('message').$m.push

alas.setLocale('zh-tw')
alas.addPackage(MsPackage)
alas.addContainer('project', Project.Container)
alas.addContainer('actions', Actions.Container)

export default alas
