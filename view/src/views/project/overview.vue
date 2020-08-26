<template>
    <div style="min-height: 100vh" class="grey lighten-3">
        <input ref="output-js" hidden type="file" nwdirectory @change="outputJS">
        <input ref="output-file" hidden type="file" nwdirectory @change="outputProject">
        <ui-app-bar :title="'專案 - ' + project.name" :back="{ name: 'home' }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="outputJSClick">
                        <v-icon>mdi-language-javascript</v-icon>
                    </v-btn>
                </template>
                <span>輸出Protractor專案</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="output">
                        <v-icon>mdi-location-exit</v-icon>
                    </v-btn>
                </template>
                <span>輸出專案</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="dependencie = true">
                        <v-icon>mdi-graph-outline</v-icon>
                    </v-btn>
                </template>
                <span>npm依賴控管</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="variable = true">
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
                    <v-btn v-on="on" small icon class="mr-2" :color="removeMode ? 'red' : undefined" @click="removeMode = !removeMode">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>刪除測試</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon @click="group = true">
                        <v-icon>mdi-group</v-icon>
                    </v-btn>
                </template>
                <span>建立分類</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon @click="invoke()">
                        <v-icon>mdi-play</v-icon>
                    </v-btn>
                </template>
                <span>運行所有測試</span>
            </v-tooltip>
        </ui-app-bar>
        <div v-if="project.specs.size === 0" class="text-center pt-5 subtitle-1 grey--text">
            <div>😥</div>
            <div>一個測試也沒有</div>
        </div>
        <div v-else>
            <div v-for="(group, index) in project.groups.items" :key="index + 't'" class="pa-5">
                <div class="title">{{ group.name }}</div>
                <v-divider class="mt-3 mb-1"></v-divider>
                <v-row>
                    <template v-for="(spec, index) in project.specs.items">
                        <v-col
                            :key="index"
                            :cols="4"
                            v-if="spec.group === group.id">
                            <v-card class="pa-5" :to="removeMode ? undefined : target(spec)">
                                <v-row align="center">
                                    <div class="ml-3">{{ spec.name }}</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="removeMode" icon @click.stop="remove(spec.id)">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </div>
            <!-- 無分類 -->
            <div class="pa-5" v-if="project.specs.views.hasNoCategory">
                <div class="title">無分類</div>
                <v-divider class="mt-3 mb-1"></v-divider>
                <v-row>
                    <template v-for="(spec, index) in project.specs.items">
                        <v-col
                            :key="index"
                            :cols="4"
                            v-if="!project.groups.fetch(spec.group)">
                            <v-card class="pa-5" :to="removeMode ? undefined : target(spec)">
                                <v-row align="center">
                                    <div class="ml-3">{{ spec.name }}</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="removeMode" icon @click.stop="remove(spec.id)">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </div>
        </div>
        <v-dialog v-model="variable" max-width="800px" transition="dialog-transition">
            <self-variable :project="project"></self-variable>
        </v-dialog>
        <v-dialog v-model="dependencie" max-width="800px">
            <self-dependencie :project="project"></self-dependencie>
        </v-dialog>
        <v-dialog v-model="group" max-width="800px">
            <self-group :project="project"></self-group>
        </v-dialog>
        <ui-select-spec ref="selectSpecInvoke"></ui-select-spec>
        <ui-invoke ref="invoke"></ui-invoke>
        <ui-confirm ref="delete" title="確定刪除測試？"></ui-confirm>
        <ui-form title="建立測試" ref="create">
            <v-text-field v-model="createName" label="名稱" outlined :rules="$alas.rules(['#ms.required'])"></v-text-field>
            <v-select
                outlined
                :items="project.groups.items"
                v-model="createGroup"
                clearable
                item-text="name"
                item-value="id"
                label="分類"
            ></v-select>
            <v-select
                outlined
                :items="project.specs.items"
                v-model="createCopyTarget"
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

<script>
import fs from 'fs'
import fsx from 'fs-extra'
import Group from './components/group.vue'
import Variable from './components/variable.vue'
import Dependencie from './components/dependencie.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            createName: '',
            createGroup: '',
            createCopyTarget: null,
            variable: false,
            group: false,
            removeMode: false,
            dependencie: false
        }
    },
    computed: {
        ...mapGetters({
            project: 'project/project'
        })
    },
    components: {
        'self-group': Group,
        'self-variable': Variable,
        'self-dependencie': Dependencie
    },
    methods: {
        ...mapActions({
            save: 'project/save'
        }),
        output() {
            this.$refs['output-file'].click()
        },
        outputProject() {
            this.save()
            if (this.$refs['output-file'].value) {
                let path = this.$refs['output-file'].value + `/project-${this.project.name}.json`
                this.$refs['output-file'].value = ''
                if (fs.existsSync(path)) {
                    if (confirm('檔案已存在，是否複寫該檔案？') === false) {
                        return null
                    }
                }
                fs.writeFileSync(path, JSON.stringify(this.project.$v.output, null, 4))
                alert(`檔案輸出完畢(${path})`)
            }
        },
        outputJSClick() {
            this.$refs['output-js'].click()
        },
        outputJS() {
            this.save()
            this.project.$m.write()
            if (this.$refs['output-js'].value) {
                let path = this.$refs['output-js'].value + `/e2e-project-${this.project.name}-js`
                this.$refs['output-js'].value = ''
                if (fs.existsSync(path)) {
                    if (confirm('檔案已存在，是否複寫該檔案？') === false) {
                        return null
                    }
                    fsx.removeSync(path)
                }
                fsx.copySync(outputDir, path)
                fs.writeFileSync(path + `/project-${this.project.name}.json`, JSON.stringify(this.project.$v.output, null, 4))
                alert(`檔案輸出完畢(${path})`)
            }
        },
        invoke() {
            this.$refs.selectSpecInvoke.open(specs => {
                this.save()
                this.$refs.invoke.play(specs.map(s => s.id))
            })
        },
        target(spec) {
            return {
                name: 'project.spec',
                params: {
                    id: spec.id
                }
            }
        },
        create() {
            this.$refs.create.open(() => {
                if (this.createCopyTarget) {
                    let target = this.createCopyTarget.$export()
                    target.id = undefined
                    target.name = this.createName
                    target.group = this.createGroup
                    this.project.specs.write(target)
                } else {
                    this.project.specs.write({
                        name: this.createName,
                        group: this.createGroup
                    })
                }
            })
        },
        remove(id) {
            this.$refs.delete.open(done => {
                this.project.specs.remove(id)
                done()
            })
        }
    }
}
</script>