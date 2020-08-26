import Core from './core'

const core = new Core()

core.addTemplate(import('./templates/wait'))
core.addTemplate(import('./templates/set-path'))
core.addTemplate(import('./templates/scroll'))
core.addTemplate(import('./templates/click'))
core.addTemplate(import('./templates/click-btn'))
core.addTemplate(import('./templates/verify'))
core.addTemplate(import('./templates/verify-url'))
core.addTemplate(import('./templates/key-in'))
core.addTemplate(import('./templates/select'))
core.addTemplate(import('./templates/click-tag'))
core.addTemplate(import('./templates/verify-tag'))
core.addTemplate(import('./templates/play-sound'))
core.addTemplate(import('./templates/code'))
core.addTemplate(import('./templates/http'))
core.addTemplate(import('./templates/count'))
core.addTemplate(import('./templates/clear'))
core.addTemplate(import('./templates/polling'))
core.addTemplate(import('./templates/refresh'))
core.addTemplate(import('./templates/localstorage'))
core.addTemplate(import('./templates/back'))
core.addTemplate(import('./templates/forward'))

export default core
