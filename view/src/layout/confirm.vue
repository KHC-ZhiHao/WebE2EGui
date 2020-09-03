<template>
    <v-dialog v-model="$.confirm.open" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ $.confirm.title }}</span>
            </v-card-title>
            <v-btn class="mt-2" tile block color="accent" @click="$.confirm.confirm()">確定</v-btn>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { status } from '@/alas'
import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
    setup() {

        // =================
        //
        // state
        //

        let $ = reactive({
            confirm: status.fetch('confirm')
        })

        // =================
        //
        // done
        //

        return {
            $
        }
    }
})
</script>
