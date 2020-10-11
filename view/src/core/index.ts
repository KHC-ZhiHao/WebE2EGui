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
import ActionClickBtn from './templates/action-click-btn'
import ActionClickTag from './templates/action-click-tag'

import SystemBack from './templates/system-back'
import SystemRefresh from './templates/system-refresh'
import SystemPlaySound from './templates/system-play-sound'
import SystemForward from './templates/system-forward'

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
core.addTemplate(ActionClickBtn)
core.addTemplate(ActionClickTag)

core.addTemplate(SystemBack)
core.addTemplate(SystemRefresh)
core.addTemplate(SystemPlaySound)
core.addTemplate(SystemForward)

export default core
