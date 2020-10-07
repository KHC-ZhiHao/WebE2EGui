import Core from './core'

const core = new Core()

core.addTemplate(require('./templates/wait').default)

export default core
