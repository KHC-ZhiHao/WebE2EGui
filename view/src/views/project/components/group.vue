<template>
    <v-card>
        <v-card-title primary-title>
            <span>分類</span>
            <v-spacer></v-spacer>
            <v-btn text @click="project.groups.methods.sort()" icon>
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider class="mb-5 mt-1"></v-divider>
        <v-card-text>
            <div v-if="project.groups.size === 0" class="mt-1 body-2 grey--text">本專案沒有分類</div>
            <v-row
                v-for="(group, index) in project.groups.items"
                :key="index + 't'"
                hide-details
                no-gutters
                align="center"
                class="mt-3 mx-0">
                <v-col cols="5" class="mr-2">
                    <v-text-field dense outlined hide-details v-model="group.name" label="名稱"></v-text-field>
                </v-col>
                <v-col cols="5" class="mr-2">
                    <v-text-field dense outlined hide-details v-model="group.level" label="優先級"></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn outlined @click="remove(group.id)">
                        刪除
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-btn tile block color="primary" class="mt-2" @click="create">加入一個分類</v-btn>
    </v-card>
</template>
<script lang="ts">
import * as Project from '@/alas/project/project'
import { defineComponent, PropType } from '@vue/composition-api'
export default defineComponent({
    props: {
        project: Object as PropType<Project.Model>
    },
    setup(props) {

        // =================
        //
        // methods
        //

        let remove = (id) => {
            props.project.groups.remove(id)
        }

        let create = () => {
            props.project.groups.write({
                name: '',
                level: 0
            })
        }

        // =================
        //
        // done
        //

        return {
            remove,
            create
        }
    }
})
</script>