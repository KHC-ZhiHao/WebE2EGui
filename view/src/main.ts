import 'vuetify/dist/vuetify.min.css'
import 'v-markdown-editor/dist/v-markdown-editor.css'
import 'codemirror/lib/codemirror.css'
import './sass/main.scss'
import './components'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCodemirror from 'vue-codemirror'
import VueMarkDownEditor from 'v-markdown-editor'
import VueCompositionAPI from '@vue/composition-api'

import app from './app.vue'
import i18n from './i18n'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueMarkDownEditor)
Vue.use(VueCompositionAPI)
Vue.use(VueCodemirror, {
    options: {
        tabSize: 8,
        lineNumbers: true,
        line: true
    }
})

let vuetify = new Vuetify({
    icons: {
        iconfont: 'mdi'
    }
})

new Vue({
    i18n,
    router,
    vuetify,
    render: h => h(app)
}).$mount('#app')
