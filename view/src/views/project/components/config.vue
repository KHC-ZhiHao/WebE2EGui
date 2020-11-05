<template>
    <v-card>
        <v-card-title primary-title>測試設定</v-card-title>
        <v-divider class="mb-5 mt-1"></v-divider>
        <v-card-text>
            <!-- 解析度 -->
            <v-row hide-details no-gutters align="center" class="mt-3 mx-0">
                <v-col cols="5" class="mr-2">
                    <v-text-field dense outlined hide-details v-model="variable.value" label="解析度寬"></v-text-field>
                </v-col>
                <v-col cols="5" class="mr-2">
                    <v-text-field dense outlined hide-details v-model="variable.value" label="解析度寬"></v-text-field>
                </v-col>
            </v-row>
            <!-- 是否自動開啟Console -->
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Self } from '@/vue-core'
import { alas, status } from '@/alas'
import { showError, showSuccess } from '@/store'
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
export default defineComponent({
    props: {},
    setup(props, context) {

        const self = new Self(context)

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
        // done
        //

        return {}
    }
})
</script>
