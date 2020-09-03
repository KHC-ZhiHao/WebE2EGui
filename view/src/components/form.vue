<template>
    <v-dialog v-model="$.dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-divider class="mb-5 mt-2"></v-divider>
            <v-card-text class="pb-0">
                <v-form v-model="$.validate" ref="form">
                    <slot></slot>
                </v-form>
            </v-card-text>
            <v-btn
                tile
                block
                color="primary"
                :disabled="!$.validate"
                @click="confirm">
                {{ confirmName ? confirmName : '新增' }}
            </v-btn>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Self, RefComponent } from '@/vue-core'
import { defineComponent, reactive, ref } from '@vue/composition-api'
export default defineComponent({
    props: {
        title: String,
        confirmName: String
    },
    setup(props, context) {

        let self = new Self(context)

        // =================
        //
        // refs
        //

        let form: RefComponent<any> = ref(null)

        // =================
        //
        // state
        //

        let $ = reactive({
            dialog: false,
            validate: false,
            callback: null
        })

        // =================
        //
        // methods
        //

        let open = (callback) => {
            $.dialog = true
            $.callback = callback
            self.nextTick(() => form.value.reset())
        }
        
        let confirm = () => {
            $.dialog = false
            if ($.callback) {
                $.callback()
                $.callback = null
            }
        }

        // =================
        //
        // done
        //

        return {
            $,
            form,
            open,
            confirm
        }
    }
})
</script>
