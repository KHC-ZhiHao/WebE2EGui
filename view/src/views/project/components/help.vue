<template>
    <v-dialog v-model="$.help" max-width="500px">
        <v-card v-if="$.template">
            <v-card-title>{{ $.core.templates[$.template.name].btnText }}</v-card-title>
            <p class="body-2 px-5 mx-1 grey--text">{{ $.core.templates[$.template.name].info }}</p>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
                <div v-html="$.content"></div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import core from '@/core'
import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
    props: {},
    setup() {

        // =================
        //
        // state
        //

        let $ = reactive({
            core,
            help: false,
            content: '',
            template: null
        })

        // =================
        //
        // methods
        //

        let open = (template) => {
            let content = core.templates[template.name].help
            $.template = template
            $.content = content || '無說明'
            $.help = true
        }

        // =================
        //
        // done
        //

        return {
            $,
            open
        }
    }
})
</script>
