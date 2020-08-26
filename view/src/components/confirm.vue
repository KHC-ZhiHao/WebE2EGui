<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-btn class="mt-2" tile block color="accent" @click="confirm()">確定</v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            dialog: false,
            callback: null
        }
    },
    methods: {
        open(callback) {
            this.dialog = true
            this.callback = callback
        },
        confirm() {
            this.$emit('confirm')
            if (this.callback) {
                this.callback(() => {
                    this.dialog = false
                    this.callback = null
                })
            }
        }
    }
}
</script>
