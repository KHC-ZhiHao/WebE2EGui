import Vue from 'vue'
import VueI18n from 'vue-i18n'

import alas from '@/alas'
import EN from './locale/en-us'
import TW from './locale/zh-tw'

Vue.use(VueI18n)

alas.setLocale('zh-tw')

const messages = {
    'en': EN,
    'zh-TW': TW
}

export default new VueI18n({
    locale: 'zh-TW',
    silentTranslationWarn: true,
    messages
})
