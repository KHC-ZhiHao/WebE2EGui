<template>
    <v-dialog v-model="help" max-width="500px">
        <v-card v-if="template" dark>
            <v-card-title>{{ template.name }}</v-card-title>
            <p class="body-2 px-5 mx-1 teal--text">{{ $core.templates[template.name].info }}</p>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
                <div v-html="content"></div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import marked from 'marked'
export default {
    data() {
        return {
            help: false,
            content: '',
            template: null
        }
    },
    methods: {
        open(template) {
            let content = this.$core.templates[template.name].help
            this.template = template
            this.content = content ? marked(content) : '無說明'
            this.help = true
        }
    }
}
</script>
