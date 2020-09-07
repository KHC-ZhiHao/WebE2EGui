<template>
    <div v-if="$.spec" style="min-height: 100vh" class="grey lighten-3">
        <ui-app-bar :title="'測試 - ' + $.spec.name" :back="{ name: 'project.overview' }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="$.variable = true">
                        <v-icon>mdi-variable</v-icon>
                    </v-btn>
                </template>
                <span>設定變數</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon @click="invokeTest()">
                        <v-icon>mdi-play</v-icon>
                    </v-btn>
                </template>
                <span>運行測試</span>
            </v-tooltip>
        </ui-app-bar>
        <v-btn fab dark fixed right bottom color="primary" @click="createStep">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <div class="pa-5">
            <v-row class="mx-0" no-gutters>
                <v-col cols="4">
                    <v-select
                        outlined
                        :items="$.project.groups.items"
                        v-model="$.spec.group"
                        clearable
                        class="mb-4"
                        hide-details
                        item-text="name"
                        item-value="id"
                        label="分類"
                    ></v-select>
                </v-col>
                <v-col cols="8">
                    <v-text-field
                        label="名子"
                        class="mb-4"
                        hide-details
                        v-model="$.spec.name"
                        outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-select
                outlined
                :items="specs"
                v-model="$.spec.parent"
                hide-details
                clearable
                item-text="name"
                item-value="id"
                class="mb-4"
                label="繼承對象"
            ></v-select>
            <div v-for="(step, index) in $.spec.steps.items" :key="step.name + index">
                <v-toolbar dense elevation="1" color="cyan lighten-5">
                    <v-toolbar-title>{{ step.name }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon small class="mx-1" @click="updateStep(step)">
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-btn icon small class="mx-1" @click="removeStep(step.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <!-- <v-btn icon small class="mx-1" @click="pasteStep({ spec, index: index + 1 })" v-if="copyStepUnit">
                        <v-icon>mdi-content-paste</v-icon>
                    </v-btn>
                    <v-btn icon small class="mx-1" @click="copyStep(step)">
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn> -->
                    <v-btn icon small class="mx-1" @click="$.spec.steps.methods.indexUp(index)">
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn icon small class="mx-1" @click="$.spec.steps.methods.indexDown(index)">
                        <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                </v-toolbar>
                <div class="py-4">
                    <v-btn v-if="step.templates.size === 0" @click="openCreateTemplate(step, -1)" outlined block>建立第一個模板</v-btn>
                    <self-template
                        @add="openCreateTemplate"
                        @help="openHelp"
                        @write="openWrite"
                        class="draggable-template"
                        v-for="(template, index) in step.templates.items"
                        ref="templates"
                        :step="step"
                        :index="index"
                        :template="template"
                        :key="index + 't'">
                    </self-template>
                </div>
            </div>
            <!-- <v-btn block light @click="pasteStep({ spec: $.spec, index: $.spec.steps.length })" v-if="copyStepUnit">貼上步驟</v-btn> -->
        </div>
        <ui-form title="加入步驟" ref="create">
            <v-text-field
                :rules="$.alas.rules(['#ms.required'])"
                v-model="$.createName"
                label="名稱"
                outlined
            ></v-text-field>
        </ui-form>
        <ui-form title="更新步驟" ref="update" confirm-name="更新">
            <v-text-field
                :rules="$.alas.rules(['#ms.required'])"
                v-model="$.renameName"
                label="名稱"
                outlined
            ></v-text-field>
        </ui-form>
        <ui-invoke ref="invoke"></ui-invoke>
        <v-dialog v-model="$.variable" max-width="800px">
            <self-variable :project="$.project"></self-variable>
        </v-dialog>
        <v-card v-if="$.write" style="position: fixed; bottom: 0; width: 100vw;">
            <v-card-title>
                輸出程式碼
                <v-spacer></v-spacer>
                <v-btn icon @click="copyCode">
                    <v-icon>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn icon @click="$.write = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <codemirror
                v-model="$.writeContent"
                :options="{
                    mode: 'text/javascript',
                    readOnly: true,
                    lineNumbers: true,
                    line: true,
                    lineWrapping: true
                }"
            ></codemirror>
        </v-card>
        <self-help ref="help"></self-help>
        <self-temp-btn ref="createTemplate" @add="openTemplateEdit"></self-temp-btn>
    </div>
</template>

<script lang="ts">
import core from '@/core'
import Help from './components/help.vue'
import TempBtn from './components/temp-btn.vue'
import Template from './components/template.vue'
import Variable from './components/variable.vue'
import { copy } from '@/utils'
import { Self, RefComponentArray, RefComponent } from '@/vue-core'
import { beautify } from '@/requests'
import { alas, status, action } from '@/alas'
import { defineComponent, reactive, onMounted, computed, ref } from '@vue/composition-api'
export default defineComponent({
    props: {},
    components: {
        'self-help': Help,
        'self-temp-btn': TempBtn,
        'self-variable': Variable,
        'self-template': Template
    },
    setup(props, context) {

        let self = new Self(context)

        // =================
        //
        // refs
        //

        let help: RefComponent<any> = ref(null)
        let create: RefComponent<any> = ref(null)
        let update: RefComponent<any> = ref(null)
        let invoke: RefComponent<any> = ref(null)
        let createTemplate: RefComponent<any> = ref(null)
        let templates: RefComponentArray<any> = ref(null)

        // =================
        //
        // state
        //

        let $ = reactive({
            alas,
            project: status.fetch('project'),
            copy: status.fetch('copy'),
            spec: null,
            write: false,
            writeContent: '',
            variable: false,
            renameName: '',
            createName: ''
        })

        // =================
        //
        // computed
        //

        let specs = computed(() => {
            return $.project.specs.items.filter(s => s.id !== $.spec.id).map(s => {
                return {
                    id: s.id,
                    name: s.$v.typeAndName
                }
            })
        })

        // =================
        //
        // mounted
        //

        onMounted(() => {
            $.spec = $.project.specs.items.find(s => s.id === self.route.params.id)
        })

        // =================
        //
        // methods
        //

        let openCreateTemplate = (step, index) => {
            createTemplate.value.open(step, index)
        }

        let invokeTest = () => {
            $.project.$o.save.start()
            invoke.value.play([$.spec.id])
        }

        let createStep = () => {
            create.value.open(() => {
                $.spec.steps.write({
                    name: $.createName
                })
            })
        }

        let updateStep = (step) => {
            $.renameName = step.name
            update.value.open(() => {
                step.name = $.renameName
            })
        }

        let removeStep = (id) => {
            action.confirm('確定刪除步驟？', done => {
                $.spec.steps.remove(id)
                done()
            })
        }

        let openTemplateEdit = (id) => {
            setTimeout(() => {
                templates[id].edit = true
            }, 100)
        }

        let openHelp = (template) => {
            help.value.open(template)
        }

        let openWrite = async(template) => {
            $.write = true
            $.writeContent = await beautify(core.templates[template.name].write(template.props), 4)
        }

        let copyCode = () => {
            copy($.writeContent)
        }

        // =================
        //
        // done
        //

        return {
            $,
            specs,
            openCreateTemplate,
            invokeTest,
            createStep,
            updateStep,
            removeStep,
            openTemplateEdit,
            openHelp,
            openWrite,
            copyCode,
            help,
            create,
            update,
            invoke,
            createTemplate,
            templates
        }
    }
})
</script>
