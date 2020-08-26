<template>
    <v-dialog v-model="dialog" persistent width="80%" scrollable>
        <v-card dark>
            <v-card-title>
                {{ done ? `安裝完畢` : `正在安裝依賴...` }}
            </v-card-title>
            <v-card-text>
                <p v-for="(text, index) in result" :key="index + text" v-html="text"></p>
                <div ref="done"></div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="done === false" text @click="dialog = false">關閉</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { exec } from 'child_process'
export default {
    data() {
        return {
            done: false,
            dialog: false,
            result: []
        }
    },
    watch: {
        dialog() {
            this.done = false
            this.result = []
        }
    },
    methods: {
        close() {
            setTimeout(() => {
                this.dialog = false
            }, 100)
        },
        open(project) {
            this.dialog = true
            try {
                let packages = project.dependencies.items.map(s => s.name + '@' + s.version)
                let script = `npm install -g protractor & webdriver-manager update & npm install request-promise ${packages.join(' ')} --no-save`
                let process = exec(script)
                this.$nextTick(() => this.result.push(script))
                process.stdout.on('data', data => {
                    this.result.push(data)
                    setTimeout(() => {
                        this.$refs.done.parentNode.scrollTo(0, 99999999)
                    }, 100)
                })
                process.on('exit', () => {
                    this.done = true
                    this.$emit('done')
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>