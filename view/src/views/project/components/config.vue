<template>
    <v-card>
        <v-card-title primary-title>測試設定</v-card-title>
        <v-divider class="mb-5 mt-1"></v-divider>
        <v-card-text>
            <v-radio-group label="執行瀏覽器" v-model="project.browserOption.target" hide-details>
                <v-radio label="chrome" value="chrome" class="mt-2"></v-radio>
                <v-radio label="firefox" value="firefox(BETA)"></v-radio>
            </v-radio-group>
            <v-switch class="mb-2" label="自動打開Console" v-model="project.browserOption.openConsole"></v-switch>
            <!-- 解析度 -->
            <v-text-field
                label="視窗寬"
                outlined
                v-model="project.browserOption.width"
                :rules="project.browserOption.$rules('width')">
            </v-text-field>
            <v-text-field
                label="視窗高"
                outlined
                v-model="project.browserOption.height"
                :rules="project.browserOption.$rules('height')">
            </v-text-field>
            <v-text-field
                label="起始位置X"
                outlined
                v-model="project.browserOption.posX"
                :rules="project.browserOption.$rules('posX')">
            </v-text-field>
            <v-text-field
                label="起始位置Y"
                outlined
                v-model="project.browserOption.posY"
                :rules="project.browserOption.$rules('posY')">
            </v-text-field>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import * as Project from '@/alas/project/project'
import { defineComponent, PropType } from '@vue/composition-api'
export default defineComponent({
    props: {
        project: Object as PropType<Project.Model>
    },
    setup() {
        return {}
    }
})
</script>
