<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-divider class="mb-5 mt-2"></v-divider>
            <v-card-text class="pb-0">
                <v-form v-model="validate" ref="form">
                    <slot></slot>
                </v-form>
            </v-card-text>
            <v-btn
                tile
                block
                color="primary"
                :disabled="!validate"
                @click="confirm">
                {{ confirmName ? confirmName : '新增' }}
            </v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['title', 'confirmName'],
    data() {
        return {
            dialog: false,
            validate: false,
            callback: null
        }
    },
    methods: {
        open(callback) {
            this.dialog = true
            this.callback = callback
            this.$nextTick(() => this.$refs.form.reset())
        },
        confirm() {
            this.dialog = false
            if (this.callback) {
                this.callback()
                this.callback = null
            }
        }
    }
}
</script>
