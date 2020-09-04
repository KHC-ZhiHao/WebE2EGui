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

<script lang="ts">
import { Self } from '@/vue-core'
import { alas, status } from '@/alas'
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
export default defineComponent({
    setup(props, context) {

        let self = new Self(context)

        // =================
        //
        // state
        //

        let $ = reactive({
            copy: status.fetch('copy'),
            info: '',
            step: null,
            index: null,
            dialog: false
        })

        // =================
        //
        // methods
        //

        let open = (step, index) => {
            $.step = step
            $.index = index
            $.dialog = true
        }

        let getTypeName = (type) => {
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
        }

        let addTemplate = (name, template) => {
            let props = {}
            for (let key in template.props) {
                props[key] = template.props[key].default
            }
            $.dialog = false
            $.step.templates.once('$writeSuccess', (self, context, {
                key
            }) => {
                self.$emit('add', key)
            })
            $.step.templates.write({
                name,
                props
            }, {
                insert: $.index + 1
            })
        }

        let addPasteTemplate = (index) => {
            $.copy.$m.pasteTemplate({
                step: $.step,
                insert: $.index,
                index
            })
            $.dialog = false
        }

        // =================
        //
        // done
        //

        return {
            $,
            open,
            getTypeName,
            addTemplate,
            // addPasteTemplate
        }
    }
})
</script>