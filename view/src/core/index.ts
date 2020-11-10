import Core from './core'
import Verify from './templates/verify'
import VerifyHas from './templates/verify-has'
import VerifyUrl from './templates/verify-url'
import VerifyTag from './templates/verify-tag'
import VerifyCount from './templates/verify-count'
import VerifyPolling from './templates/verify-polling'

import ActionWait from './templates/action-wait'
import ActionClear from './templates/action-clear'
import ActionClick from './templates/action-click'
import ActionKeyIn from './templates/action-key-in'
import ActionSelect from './templates/action-select'
import ActionScroll from './templates/action-scroll'
import ActionSetPath from './templates/action-set-path'
import ActionClickBtn from './templates/action-click-btn'
import ActionClickTag from './templates/action-click-tag'

import SystemBack from './templates/system-back'
import SystemRefresh from './templates/system-refresh'
import SystemPlaySound from './templates/system-play-sound'
import SystemForward from './templates/system-forward'
import SystemLocalstorage from './templates/system-localstorage'
import SystemScreenShot from './templates/system-screen-shot'
import SystemPrintUrl from './templates/system-print-url'

import EngineerCode from './templates/engineer-code'
import EngineerHttp from './templates/engineer-http'

const core = new Core()

core.addTemplate(Verify)
core.addTemplate(VerifyUrl)
core.addTemplate(VerifyTag)
core.addTemplate(VerifyHas)
core.addTemplate(VerifyCount)
core.addTemplate(VerifyPolling)

core.addTemplate(ActionWait)
core.addTemplate(ActionKeyIn)
core.addTemplate(ActionClear)
core.addTemplate(ActionClick)
core.addTemplate(ActionSelect)
core.addTemplate(ActionScroll)
core.addTemplate(ActionSetPath)
core.addTemplate(ActionClickBtn)
core.addTemplate(ActionClickTag)

core.addTemplate(SystemBack)
core.addTemplate(SystemRefresh)
core.addTemplate(SystemPlaySound)
core.addTemplate(SystemForward)
core.addTemplate(SystemLocalstorage)
core.addTemplate(SystemScreenShot)
core.addTemplate(SystemPrintUrl)

core.addTemplate(EngineerCode)
core.addTemplate(EngineerHttp)

export default core
