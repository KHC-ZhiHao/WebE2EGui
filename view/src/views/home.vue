<template>
    <div>
        <input ref="inputFile" hidden type="file" @change="inputProject" accept=".json">
        <ui-install ref="install" @done="installDone"></ui-install>
        <ui-form ref="createForm" title="建立專案">
            <v-text-field
                v-model="$.createName"
                label="名稱"
                outlined
                :rules="$.alas.rules(['#ms.required'])"
            ></v-text-field>
        </ui-form>
        <ui-app-bar title="首頁">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon class="mr-2" @click="input">
                        <v-icon>mdi-location-enter</v-icon>
                    </v-btn>
                </template>
                <span>引入專案</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon small @click="$.deleteMode = !$.deleteMode" :color="$.deleteMode ? 'red' : undefined">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>刪除專案</span>
            </v-tooltip>
        </ui-app-bar>
        <div v-if="$.projects.length === 0" class="text-center pt-5 subtitle-1 grey--text">
            <div>😥</div>
            <div>一個專案也沒有</div>
        </div>
        <v-row class="pa-5 pt-3">
            <v-col v-for="project in $.projects" :key="project" :cols="4">
                <v-card light :to="$.deleteMode ? undefined : target(project)">
                    <v-card-title>
                        {{ project }}
                        <v-spacer></v-spacer>
                        <v-btn v-if="$.deleteMode" icon @click="remove(project)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-btn fab dark fixed right bottom color="primary" @click="create">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import * as requests from '@/requests'
import { getConfig, readFileText } from '@/utils'
import { RefComponent, RefElement } from '@/vue-core'
import { action, alas } from '@/alas'
import { defineComponent, reactive, onMounted, ref } from '@vue/composition-api'
export default defineComponent({
    setup() {

        let config = getConfig()

        // =================
        //
        // refs
        //

        let install: RefComponent<any> = ref(null)
        let inputFile: RefElement<HTMLInputElement> = ref(null)
        let createForm: RefComponent<any> = ref(null)

        // =================
        //
        // state
        //

        let $ = reactive({
            alas,
            projects: [],
            createName: '',
            deleteMode: false
        })

        // =================
        //
        // mounted
        //

        onMounted(() => {
            reload()
        })

        // =================
        //
        // methods
        //

        let reload = async() => {
            $.projects = (await requests.readdir(config.projectDir)).map(name => name.replace('.json', ''))
        }

        let input = () => {
            inputFile.value.click()
        }

        let inputProject = async() => {
            if (!inputFile.value.value) {
                return null
            }
            let target = await readFileText(inputFile.value.files[0])
            let project = alas.make('project', 'project').$init(JSON.parse(target))
            if (project.name == null) {
                return action.message('error', '格式不正確')
            }
            if ($.projects.includes(project.name)) {
                return action.message('error', '專案已存在')
            }
            await project.$o.save.start()
            install.value.open(project)
            inputFile.value.value = ''
            reload()
        }

        let create = () => {
            createForm.value.open(async() => {
                if ($.projects.includes($.createName)) {
                    return action.message('error', '專案已存在。')
                }
                let project = alas.make('project', 'project').$init({
                    name: $.createName
                })
                await project.$o.save.start()
                install.value.open(project)
                reload()
            })
        }

        let remove = async(project) => {
            action.confirm('確定刪除專案？', async done => {
                await requests.remove(`${config.projectDir}/${project}.json`)
                reload()
                done()
            })
        }

        let target = (project) => {
            return {
                name: 'project.overview',
                params: {
                    project: project
                }
            }
        }

        let installDone = () => {
            install.value.close()
        }

        // =================
        //
        // done
        //

        return {
            $,
            reload,
            input,
            inputProject,
            inputFile,
            create,
            target,
            remove,
            install,
            installDone,
            createForm
        }
    }
})
</script>
