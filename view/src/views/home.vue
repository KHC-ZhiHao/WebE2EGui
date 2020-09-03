<template>
    <div style="min-height: 100vh" class="grey lighten-3">
        <input ref="input-file" hidden type="file" @change="inputProject" accept=".json">
        <ui-install ref="install" @done="installDone"></ui-install>
        <ui-confirm ref="delete" title="確定刪除專案？"></ui-confirm>
        <ui-form ref="create" title="建立專案">
            <v-text-field
                v-model="createName"
                label="名稱"
                outlined
                :rules="$alas.rules(['#ms.required'])"
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
                    <v-btn v-on="on" icon small @click="deleteMode = !deleteMode" :color="deleteMode ? 'red' : undefined">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>刪除專案</span>
            </v-tooltip>
        </ui-app-bar>
        <div v-if="projects.length === 0" class="text-center pt-5 subtitle-1 grey--text">
            <div>😥</div>
            <div>一個專案也沒有</div>
        </div>
        <v-row class="pa-5 pt-3">
            <v-col v-for="project in projects" :key="project" :cols="4">
                <v-card light :to="deleteMode ? undefined : target(project)">
                    <v-card-title>
                        {{ project }}
                        <v-spacer></v-spacer>
                        <v-btn v-if="deleteMode" icon @click="remove(project)">
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

<script>
import fs from 'fs'
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            projects: [],
            createName: '',
            deleteMode: false
        }
    },
    mounted() {
        this.reload()
    },
    methods: {
        input() {
            this.$refs['input-file'].click()
        },
        inputProject() {
            if (!this.$refs['input-file'].value) {
                return null
            }
            let target = JSON.parse(fs.readFileSync(this.$refs['input-file'].value))
            let project = this.$alas.make('project/project').$init(target)
            if (project.name == null) {
                return alert('格式不正確')
            }
            let path = `${projectDir}/${project.name}.json`
            if (fs.existsSync(path)) {
                if (confirm('專案已存在，是否複寫該專案？') === false) {
                    return null
                }
            }
            project.$m.save()
            this.$refs['install'].open(project)
            this.$refs['input-file'].value = ''
            this.reload()
        },
        reload() {
            this.projects = fs.readdirSync(projectDir).map(name => name.replace('.json', ''))
        },
        create() {
            this.$refs.create.open(() => {
                let path = `${projectDir}/${this.createName}.json`
                if (fs.existsSync(path)) {
                    return alert('專案已存在。')
                }
                let project = this.$alas.make('project/project').$init({ name: this.createName })
                project.$m.save()
                this.$refs['install'].open(project)
                this.reload()
            })
        },
        remove(project) {
            this.$refs.delete.open(done => {
                fs.unlinkSync(`${projectDir}/${project}.json`)
                this.reload()
                done()
            })
        },
        target(project) {
            return {
                name: 'project',
                params: {
                    project: project
                }
            }
        },
        installDone() {
            this.$refs['install'].close()
        }
    }
}
</script>
