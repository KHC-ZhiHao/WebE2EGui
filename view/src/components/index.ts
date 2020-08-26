import Vue from 'vue'

import Invoke from './invoke.vue'
import AppBar from './app-bar.vue'
import Confirm from './confirm.vue'
import Install from './install.vue'
import Form from './form.vue'
import SelectSpec from './select-spec.vue'

Vue.component('ui-app-bar', AppBar)
Vue.component('ui-confirm', Confirm)
Vue.component('ui-invoke', Invoke)
Vue.component('ui-install', Install)
Vue.component('ui-form', Form)
Vue.component('ui-select-spec', SelectSpec)
