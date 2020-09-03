<template>
    <v-dialog v-model="dialog" class="temp-btn-list" scrollable>
        <v-card>
            <v-card-title>
                <span>新增模板</span>
                <v-spacer></v-spacer>
                <span class="caption">{{ info }}</span>
            </v-card-title>
            <v-divider class="mb-4 mt-1"></v-divider>
            <v-card-text>
                <div v-for="type in $core.types" :key="type" class="mb-3">
                    <div style="font-size: 18px">{{ getTypeName(type) }}</div>
                    <span v-for="(template, name) in $core.templates" :key="name">
                        <v-btn
                            dark
                            v-if="type === template.type"
                            :color="template.color"
                            class="mt-2 mr-2"
                            @mouseenter="info = template.info"
                            @mouseleave="info = ''"
                            @click="addTemplate(name, template)">
                            {{ template.btnText }}
                        </v-btn>
                    </span>
                    <v-btn
                        dark
                        v-if="type === 'custom'"
                        class="mt-2 mr-2"
                        :to="{ name: 'project.custombtn' }">
                        新增自訂按鈕
                    </v-btn>
                </div>
                <div class="mb-3" v-if="copyTemplates.length > 0">
                    <div class="mb-3" style="font-size: 18px">剪貼簿</div>
                    <v-toolbar dense class="elevation-1" v-for="(template, index) of copyTemplates" :key="template.id + 'key'">
                        <v-card :color="$core.templates[template.name].color">&nbsp;</v-card>
                        <span class="ml-3">{{ $core.templates[template.name].display(template.props) }}</span>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="removeTemplate(index)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                        <v-btn icon @click="addPasteTemplate(index)">
                            <v-icon>mdi-content-paste</v-icon>
                        </v-btn>
                    </v-toolbar>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import uuid from 'uuid/v4'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            info: '',
            step: null,
            index: null,
            dialog: false
        }
    },
    computed: {
        ...mapGetters({
            'copyTemplates': 'copy/templates'
        })
    },
    methods: {
        ...mapMutations({
            'pasteTemplate': 'copy/pasteTemplate',
            'removeTemplate': 'copy/removeTemplate'
        }),
        open(step, index) {
            this.step = step
            this.index = index
            this.dialog = true
        },
        getTypeName(type) {
            if (type === 'action') {
                return '動作'
            }
            if (type === 'system') {
                return '系統'
            }
            if (type === 'verify') {
                return '驗證'
            }
            if (type === 'engineer') {
                return '開發人員專用'
            }
            if (type === 'custom') {
                return '自訂'
            }
            return type
        },
        addTemplate(name, template) {
            let props = {}
            for (let key in template.props) {
                props[key] = template.props[key].default
            }
            this.dialog = false
            this.step.templates.once('$writeSuccess', (self, context, { key }) => {
                this.$emit('add', key)
            })
            this.step.templates.write({
                name,
                props
            }, {
                insert: this.index + 1
            })
        },
        addPasteTemplate(index) {
            this.pasteTemplate({
                step: this.step,
                insert: this.index,
                index
            })
            this.dialog = false
        }
    }
}
</script>
