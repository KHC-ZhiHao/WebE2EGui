import Core from './core'
import Wait from './templates/wait'
import Verify from './templates/verify'
import VerifyHas from './templates/verify-has'
import VerifyUrl from './templates/verify-url'
import VerifyTag from './templates/verify-tag'
import VerifyCount from './templates/verify-count'
import VerifyPolling from './templates/verify-polling'

import ActionClear from './templates/action-clear'
import ActionSelect from './templates/action-select'
import ActionSetPath from './templates/action-set-path'

const core = new Core()

core.addTemplate(Wait)
core.addTemplate(Verify)
core.addTemplate(VerifyUrl)
core.addTemplate(VerifyTag)
core.addTemplate(VerifyHas)
core.addTemplate(VerifyCount)
core.addTemplate(VerifyPolling)

core.addTemplate(ActionClear)
core.addTemplate(ActionSelect)
core.addTemplate(ActionSetPath)

export default core
