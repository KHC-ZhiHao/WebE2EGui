<template>
    <v-card>
        <ui-install ref="installUI"></ui-install>
        <v-card-title primary-title>
            npm依賴套件
            <v-spacer></v-spacer>
            <v-btn text @click="install">安裝</v-btn>
        </v-card-title>
        <v-divider class="mb-5 mt-1"></v-divider>
        <v-card-text>
            <div v-if="project.dependencies.size === 0" class="mt-1 body-2 grey--text">本專案沒有依賴套件</div>
            <v-row
                v-for="(dependencie, index) in project.dependencies.items"
                :key="index + 't'"
                hide-details
                no-gutters
                align="center"
                class="mt-3 mx-0">
                <v-col cols="5" class="mr-2">
                    <v-text-field
                        :disabled="project.$m.isLockDependencies(dependencie.name)"
                        dense
                        outlined
                        hide-details
                        v-model="dependencie.name"
                        label="name">
                    </v-text-field>
                </v-col>
                <v-col cols="5" class="mr-2">
                    <v-text-field
                        :disabled="project.$m.isLockDependencies(dependencie.name)"
                        dense
                        outlined
                        hide-details
                        v-model="dependencie.version"
                        label="version">
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" :disabled="project.$m.isLockDependencies(dependencie.name)" outlined @click="remove(dependencie.id)">
                                刪除
                            </v-btn>
                        </template>
                        <span>刪除依賴可能導致測試失敗</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-card-text>
        <v-btn tile block color="primary" class="mt-2" @click="addDependencie">加入一個依賴</v-btn>
    </v-card>
</template>
<script lang="ts">
import * as Project from '@/alas/project/project'
import { RefComponent } from '@/vue-core'
import { defineComponent, reactive, onMounted, ref, PropType } from '@vue/composition-api'

export default defineComponent({
    props: {
        project: Object as PropType<Project.Model>
    },
    setup(props) {

        // =================
        //
        // refs
        //

        let installUI: RefComponent<any> = ref(null)

        // =================
        //
        // state
        //

        let $ = reactive({})

        // =================
        //
        // mounted
        //

        onMounted(() => {})

        // =================
        //
        // methods
        //

        let remove = (id) => {
            props.project.dependencies.remove(id)
        }

        let install = () => {
            installUI.value.open(props.project)
        }

        let addDependencie = () => {
            props.project.dependencies.write({
                name: ''
            })
        }

        // =================
        //
        // done
        //

        return {
            $,
            remove,
            install,
            installUI,
            addDependencie
        }
    }
})
</script>