<template>
    <div style="min-height: 100vh" class="grey lighten-3">
        <ui-app-bar :title="'專案 - ' + $.project.name" :back="{ name: 'home' }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="openConfig">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </template>
                <span>Protractor設定</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="outputJS">
                        <v-icon>mdi-language-javascript</v-icon>
                    </v-btn>
                </template>
                <span>輸出Protractor專案</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="outputProject">
                        <v-icon>mdi-location-exit</v-icon>
                    </v-btn>
                </template>
                <span>輸出專案</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="$.dependencie = true">
                        <v-icon>mdi-graph-outline</v-icon>
                    </v-btn>
                </template>
                <span>npm依賴控管</span>
            </v-tooltip>
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
                    <v-btn v-on="on" small icon class="mr-2" @click="$router.push({ name: 'project.custombtn' })">
                        <v-icon>mdi-gamepad</v-icon>
                    </v-btn>
                </template>
                <span>自定義按鈕</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" :color="$.removeMode ? 'red' : undefined" @click="$.removeMode = !$.removeMode">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>刪除測試</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon @click="$.group = true">
                        <v-icon>mdi-group</v-icon>
                    </v-btn>
                </template>
                <span>建立分類</span>
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
        <div v-if="$.project.specs.size === 0" class="text-center pt-5 subtitle-1 grey--text">
            <div>😥</div>
            <div>一個測試也沒有</div>
        </div>
        <div v-else>
            <div v-for="(group, index) in $.project.groups.items" :key="index + 't'" class="pa-5">
                <div class="title">{{ group.name }}</div>
                <v-divider class="mt-3 mb-1"></v-divider>
                <v-row>
                    <template v-for="(spec, index) in $.project.specs.items">
                        <v-col
                            :key="index"
                            :cols="4"
                            v-if="spec.group === group.id">
                            <v-card class="pa-5" :to="$.removeMode ? undefined : target(spec)">
                                <v-row align="center">
                                    <div class="ml-3">{{ spec.name }}</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="$.removeMode" icon @click.stop="remove(spec.id)">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </div>
            <!-- 無分類 -->
            <div class="pa-5" v-if="$.project.specs.views.hasNoCategory">
                <div class="title">無分類</div>
                <v-divider class="mt-3 mb-1"></v-divider>
                <v-row>
                    <template v-for="(spec, index) in $.project.specs.items">
                        <v-col
                            :key="index"
                            :cols="4"
                            v-if="!$.project.groups.fetch(spec.group)">
                            <v-card class="pa-5" :to="$.removeMode ? undefined : target(spec)">
                                <v-row align="center">
                                    <div class="ml-3">{{ spec.name }}</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="$.removeMode" icon @click.stop="remove(spec.id)">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </div>
        </div>
        <v-dialog v-model="$.variable" max-width="800px" transition="dialog-transition">
            <self-variable :project="$.project"></self-variable>
        </v-dialog>
        <v-dialog v-model="$.dependencie" max-width="800px">
            <self-dependencie :project="$.project"></self-dependencie>
        </v-dialog>
        <v-dialog v-model="$.group" max-width="800px">
            <self-group :project="$.project"></self-group>
        </v-dialog>
        <v-dialog v-model="$.editConfig" max-width="800px" :persistent="!$.project.browserOption.$validate().success">
            <self-config :project="$.project"></self-config>
        </v-dialog>
        <ui-select-spec ref="selectSpecInvoke"></ui-select-spec>
        <ui-invoke ref="invoke"></ui-invoke>
        <ui-form title="建立測試" ref="createForm">
            <v-text-field v-model="$.createName" label="名稱" outlined :rules="$.alas.rules(['#ms.required'])"></v-text-field>
            <v-select
                outlined
                :items="$.project.groups.items"
                v-model="$.createGroup"
                clearable
                item-text="name"
                item-value="id"
                label="分類"
            ></v-select>
            <v-select
                outlined
                :items="$.project.specs.items"
                v-model="$.createCopyTarget"
                clearable
                item-text="$v.typeAndName"
                return-object
                label="引用模板"
            ></v-select>
        </ui-form>
        <v-btn fab dark fixed right bottom color="primary" @click="create">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import downloadjs from 'downloadjs'
import Group from './components/group.vue'
import Variable from './components/variable.vue'
import Dependencie from './components/dependencie.vue'
import Config from './components/config.vue'
import { RefComponent } from '@/vue-core'
import { alas, status, action } from '@/alas'
import { defineComponent, reactive, ref } from '@vue/composition-api'
export default defineComponent({
    props: {},
    components: {
        'self-group': Group,
        'self-config': Config,
        'self-variable': Variable,
        'self-dependencie': Dependencie
    },
    setup() {

        // =================
        //
        // state
        //

        let $ = reactive({
            alas,
            project: status.fetch('project'),
            createName: '',
            createGroup: '',
            createCopyTarget: null,
            variable: false,
            group: false,
            removeMode: false,
            dependencie: false,
            editConfig: false
        })

        // =================
        //
        // refs
        //

        let invoke: RefComponent<any> = ref(null)
        let selectSpecInvoke: RefComponent<any> = ref(null)
        let createForm: RefComponent<any> = ref(null)

        // =================
        //
        // methods
        //

        let outputProject = async() => {
            await $.project.$o.save.start()
            downloadjs(JSON.stringify($.project.$v.output, null, 4), `project-${$.project.name}.json`, 'text/plain')
        }

        let outputJS = async() => {
            await $.project.$o.save.start()
            let zip = await $.project.$m.zip()
            downloadjs(zip, `project-${$.project.name}.zip`, 'text/plain')
        }

        let invokeTest = () => {
            selectSpecInvoke.value.open(async specs => {
                await $.project.$o.save.start()
                invoke.value.play(specs.map(s => s.id))
            })
        }

        let target = (spec) => {
            return {
                name: 'project.specs',
                params: {
                    id: spec.id
                }
            }
        }

        let openConfig = () => {
            $.editConfig = true
        }

        let create = () => {
            createForm.value.open(() => {
                if ($.createCopyTarget) {
                    let target = $.createCopyTarget.$export()
                    target.id = undefined
                    target.name = $.createName
                    target.group = $.createGroup
                    $.project.specs.write(target)
                } else {
                    $.project.specs.write({
                        name: $.createName,
                        group: $.createGroup
                    })
                }
            })
        }

        let remove = (id) => {
            action.confirm('確定刪除測試？',done => {
                $.project.specs.remove(id)
                done()
            })
        }

        // =================
        //
        // done
        //

        return {
            $,
            invoke,
            selectSpecInvoke,
            createForm,
            openConfig,
            outputProject,
            outputJS,
            invokeTest,
            target,
            create,
            remove
        }
    }
})
</script>