import Core from './core'

const core = new Core()

core.addTemplate(require('./templates/wait').default)
core.addTemplate(require('./templates/set-path').default)
core.addTemplate(require('./templates/scroll').default)
core.addTemplate(require('./templates/click').default)
core.addTemplate(require('./templates/click-btn').default)
core.addTemplate(require('./templates/verify').default)
core.addTemplate(require('./templates/verify-url').default)
core.addTemplate(require('./templates/key-in').default)
core.addTemplate(require('./templates/select').default)
core.addTemplate(require('./templates/click-tag').default)
core.addTemplate(require('./templates/verify-tag').default)
core.addTemplate(require('./templates/play-sound').default)
core.addTemplate(require('./templates/code').default)
core.addTemplate(require('./templates/http').default)
core.addTemplate(require('./templates/count').default)
core.addTemplate(require('./templates/clear').default)
core.addTemplate(require('./templates/polling').default)
core.addTemplate(require('./templates/refresh').default)
core.addTemplate(require('./templates/localstorage').default)
core.addTemplate(require('./templates/back').default)
core.addTemplate(require('./templates/forward').default)
core.addTemplate(require('./templates/verify-has').default)

export default core
