import 'vuetify/dist/vuetify.min.css'
import './sass/main.scss'
import './components'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCompositionAPI from '@vue/composition-api'

import app from './app.vue'
import i18n from './i18n'
import router from './router'

Vue.use(Vuetify)
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

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
