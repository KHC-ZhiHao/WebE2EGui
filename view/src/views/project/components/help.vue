<template>
    <v-dialog v-model="help" max-width="500px">
        <v-card v-if="template" dark>
            <v-card-title>{{ template.name }}</v-card-title>
            <p class="body-2 px-5 mx-1 teal--text">{{ core.templates[template.name].info }}</p>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
                <div v-html="content"></div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import core from '@/core'
import marked from 'marked'
import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
    setup() {

        // =================
        //
        // state
        //

        let $ = reactive({
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
            $.content = content ? marked(content) : '無說明'
            $.help = true
        }

        // =================
        //
        // done
        //

        return {
            open
        }
    }
})
</script>
